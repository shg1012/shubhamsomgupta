type FrontmatterData = Record<string, unknown>;

type ParseResult<T> = {
  index: number;
  value: T;
};

export type ParsedMarkdown = {
  content: string;
  data: FrontmatterData;
};

function getIndent(line: string) {
  return line.match(/^ */)?.[0].length ?? 0;
}

function isSkippable(line: string) {
  const trimmed = line.trim();
  return trimmed === '' || trimmed.startsWith('#');
}

function stripInlineComment(value: string) {
  let inSingleQuote = false;
  let inDoubleQuote = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    const previousChar = value[index - 1];

    if (char === '"' && !inSingleQuote && previousChar !== '\\') {
      inDoubleQuote = !inDoubleQuote;
    } else if (char === "'" && !inDoubleQuote) {
      inSingleQuote = !inSingleQuote;
    } else if (char === '#' && !inSingleQuote && !inDoubleQuote) {
      return value.slice(0, index).trimEnd();
    }
  }

  return value.trimEnd();
}

function unquote(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  }

  return value;
}

function parseScalar(rawValue: string): unknown {
  const value = stripInlineComment(rawValue.trim());

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (value === '[]') {
    return [];
  }

  if (/^-?\d+(?:\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return unquote(value);
}

function parseFoldedBlock(lines: string[], startIndex: number, parentIndent: number, mode: string) {
  const blockLines: string[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (!isSkippable(line) && getIndent(line) <= parentIndent) {
      break;
    }

    blockLines.push(line);
    index += 1;
  }

  const contentIndent =
    blockLines
      .filter((line) => line.trim() !== '')
      .reduce((minimum, line) => Math.min(minimum, getIndent(line)), Number.POSITIVE_INFINITY) || parentIndent + 2;

  const normalizedLines = blockLines.map((line) => line.slice(Math.min(getIndent(line), contentIndent)));
  const text =
    mode === '|'
      ? normalizedLines.join('\n').trim()
      : normalizedLines.map((line) => line.trim()).filter(Boolean).join(' ');

  return { index, value: text };
}

function parseKeyValue(line: string, sourcePath: string) {
  const match = line.trim().match(/^([A-Za-z0-9_-]+):(.*)$/);

  if (!match) {
    throw new Error(`${sourcePath}: unsupported frontmatter line "${line.trim()}".`);
  }

  return {
    key: match[1],
    rawValue: match[2].trim(),
  };
}

function nextContentLine(lines: string[], startIndex: number) {
  let index = startIndex;

  while (index < lines.length && isSkippable(lines[index])) {
    index += 1;
  }

  return index;
}

function parseValue(
  lines: string[],
  index: number,
  parentIndent: number,
  rawValue: string,
  sourcePath: string,
): ParseResult<unknown> {
  if (rawValue === '>-' || rawValue === '>' || rawValue === '|') {
    return parseFoldedBlock(lines, index, parentIndent, rawValue === '|' ? '|' : '>');
  }

  if (rawValue !== '') {
    return {
      index,
      value: parseScalar(rawValue),
    };
  }

  const childIndex = nextContentLine(lines, index);

  if (childIndex >= lines.length || getIndent(lines[childIndex]) <= parentIndent) {
    return {
      index,
      value: {},
    };
  }

  const childIndent = getIndent(lines[childIndex]);

  if (lines[childIndex].trim().startsWith('- ')) {
    return parseArray(lines, childIndex, childIndent, sourcePath);
  }

  return parseObject(lines, childIndex, childIndent, sourcePath);
}

function parseObject(
  lines: string[],
  startIndex: number,
  indent: number,
  sourcePath: string,
): ParseResult<FrontmatterData> {
  const data: FrontmatterData = {};
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (isSkippable(line)) {
      index += 1;
      continue;
    }

    const currentIndent = getIndent(line);

    if (currentIndent < indent) {
      break;
    }

    if (currentIndent > indent) {
      throw new Error(`${sourcePath}: unexpected indentation in frontmatter line "${line.trim()}".`);
    }

    if (line.trim().startsWith('- ')) {
      break;
    }

    const { key, rawValue } = parseKeyValue(line, sourcePath);
    const parsed = parseValue(lines, index + 1, currentIndent, rawValue, sourcePath);
    data[key] = parsed.value;
    index = parsed.index;
  }

  return {
    index,
    value: data,
  };
}

function parseArray(lines: string[], startIndex: number, indent: number, sourcePath: string): ParseResult<unknown[]> {
  const values: unknown[] = [];
  let index = startIndex;

  while (index < lines.length) {
    const line = lines[index];

    if (isSkippable(line)) {
      index += 1;
      continue;
    }

    const currentIndent = getIndent(line);

    if (currentIndent < indent) {
      break;
    }

    if (currentIndent !== indent || !line.trim().startsWith('- ')) {
      throw new Error(`${sourcePath}: unsupported array item "${line.trim()}".`);
    }

    const itemValue = line.trim().slice(2).trim();

    if (itemValue === '') {
      const parsed = parseValue(lines, index + 1, currentIndent, '', sourcePath);
      values.push(parsed.value);
      index = parsed.index;
      continue;
    }

    const keyValueMatch = itemValue.match(/^([A-Za-z0-9_-]+):(.*)$/);

    if (keyValueMatch) {
      const item: FrontmatterData = {};
      const parsed = parseValue(lines, index + 1, currentIndent + 2, keyValueMatch[2].trim(), sourcePath);
      item[keyValueMatch[1]] = parsed.value;

      const remainingProperties = parseObject(lines, parsed.index, currentIndent + 2, sourcePath);
      values.push({
        ...item,
        ...remainingProperties.value,
      });
      index = remainingProperties.index;
      continue;
    }

    values.push(parseScalar(itemValue));
    index += 1;
  }

  return {
    index,
    value: values,
  };
}

export function parseMarkdownFrontmatter(source: string, sourcePath: string): ParsedMarkdown {
  const normalizedSource = source.replace(/\r\n/g, '\n');
  const lines = normalizedSource.split('\n');

  if (lines[0]?.trim() !== '---') {
    throw new Error(`${sourcePath}: missing opening frontmatter delimiter.`);
  }

  const closingIndex = lines.findIndex((line, index) => index > 0 && line.trim() === '---');

  if (closingIndex === -1) {
    throw new Error(`${sourcePath}: missing closing frontmatter delimiter.`);
  }

  const frontmatterLines = lines.slice(1, closingIndex);
  const content = lines.slice(closingIndex + 1).join('\n');

  return {
    content,
    data: parseObject(frontmatterLines, 0, 0, sourcePath).value,
  };
}

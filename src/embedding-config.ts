export const DEFAULT_MODEL = "onnx-community/granite-embedding-311m-multilingual-r2-ONNX";
export const MAX_CHARS = 2000;
export const QUERY_PREFIX = "";

export function embeddingModel(): string {
  return process.env.EPISODIC_EMBED_MODEL ?? DEFAULT_MODEL;
}

export function queryPrefix(model: string = embeddingModel()): string {
  return model.includes("snowflake-arctic")
    ? "Represent this sentence for searching relevant passages: "
    : QUERY_PREFIX;
}

export function embeddingIndexStatus(kind: "indexed" | "excluded" | "empty"): string {
  return `${kind}-v2:${embeddingModel()}:cls:q8:${MAX_CHARS}:transformers-4.3.2`;
}

export function isCurrentIndexStatus(status: string): boolean {
  return status === embeddingIndexStatus("indexed")
    || status === embeddingIndexStatus("excluded")
    || status === embeddingIndexStatus("empty");
}

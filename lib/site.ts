export const repository = {
  owner: "NamGTitm",
  name: "dev-wiki",
  branch: "master",
} as const;

export const site = {
  name: "DevHubs Wiki",
  shortName: "DevHubs",
  description: "DevHubs Wiki là kho kiến thức dành cho developer về lập trình, web, hệ thống, database, networking, security và các công nghệ liên quan.",
  url: "https://wiki.namgt.dev",
  parentUrl: "https://namgt.dev",
  repositoryUrl: `https://github.com/${repository.owner}/${repository.name}`,
} as const;

# Changelog

## [1.5.0](https://github.com/wagoid/estudio-up/compare/v1.4.0...v1.5.0) (2024-08-22)


### Features

* utiliza o endpoint da object store diretamente ([3db4bd1](https://github.com/wagoid/estudio-up/commit/3db4bd1b26b8c7e96a0092095ab520ca78eedcae))

## [1.4.0](https://github.com/wagoid/estudio-up/compare/v1.3.0...v1.4.0) (2024-08-21)


### Features

* diminui o bit rate para gerar arquivos menores ([c2365ea](https://github.com/wagoid/estudio-up/commit/c2365eaab2fd5470bb564f8c11d9d476ca98094d))

## [1.3.0](https://github.com/wagoid/estudio-up/compare/v1.2.0...v1.3.0) (2024-08-21)


### Features

* adiciona cache no docker build ([4042d90](https://github.com/wagoid/estudio-up/commit/4042d90a7d3276980abb3e0874e40aa5465e3611))
* normaliza textos para melhor geração de audios ([560186e](https://github.com/wagoid/estudio-up/commit/560186e5936293bd993a5696445be3ae2ffd5c79))

## [1.2.0](https://github.com/wagoid/estudio-up/compare/v1.1.1...v1.2.0) (2024-08-21)


### Features

* adiciona suporte a pesquisa por título ([445d02e](https://github.com/wagoid/estudio-up/commit/445d02e9670a20eb4c6f0ef5cc146944f281e003))

## [1.1.1](https://github.com/wagoid/estudio-up/compare/v1.1.0...v1.1.1) (2024-08-21)


### Bug Fixes

* annotations movidas para metadata do ingress ([6012aeb](https://github.com/wagoid/estudio-up/commit/6012aeb499f9c1e7636cb14cb09b10742a2f89ce))

## [1.1.0](https://github.com/wagoid/estudio-up/compare/v1.0.9...v1.1.0) (2024-08-21)


### Features

* adiciona annotations para certificados TLS ([7d641c8](https://github.com/wagoid/estudio-up/commit/7d641c8b1fc925ca5a309fe951590b6fa9d1995f))
* remove sufixo redundante "-deployment" ([50ce292](https://github.com/wagoid/estudio-up/commit/50ce29217acf1cb8dca2902c60b2ce73ef325d19))

## [1.0.9](https://github.com/wagoid/estudio-up/compare/v1.0.8...v1.0.9) (2024-08-21)


### Bug Fixes

* remove bash do Dockerfile ([1c6f1dc](https://github.com/wagoid/estudio-up/commit/1c6f1dccf8cde573fcd7f0067f78916bf434d5bd))

## [1.0.8](https://github.com/wagoid/estudio-up/compare/v1.0.7...v1.0.8) (2024-08-21)


### Bug Fixes

* adiciona tini e corrige script de migration ([b15e929](https://github.com/wagoid/estudio-up/commit/b15e9296041e23d96cf91d7dfa9184231fa9b3b6))

## [1.0.7](https://github.com/wagoid/estudio-up/compare/v1.0.6...v1.0.7) (2024-08-21)


### Bug Fixes

* mantem node_modules na imagem para utilizar a CLI do typeorm no init container ([e67f9c6](https://github.com/wagoid/estudio-up/commit/e67f9c6415925460fdb46f482c25527567907b42))

## [1.0.6](https://github.com/wagoid/estudio-up/compare/v1.0.5...v1.0.6) (2024-08-21)


### Bug Fixes

* setup de build em ARM ([10580f0](https://github.com/wagoid/estudio-up/commit/10580f08870ced53d3b2011e4a3ba51333c5989e))

## [1.0.5](https://github.com/wagoid/estudio-up/compare/v1.0.4...v1.0.5) (2024-08-21)


### Bug Fixes

* build da imagem na plataforma arm64 ([7e52f2f](https://github.com/wagoid/estudio-up/commit/7e52f2f1353ae3a11dcc6d3e3e53ca6fb8e1d80b))

## [1.0.4](https://github.com/wagoid/estudio-up/compare/v1.0.3...v1.0.4) (2024-08-21)


### Bug Fixes

* correção na referência da tag da imagem ([71afcba](https://github.com/wagoid/estudio-up/commit/71afcbadf6f92493e9b3cc658007d27cc9570e84))

## [1.0.3](https://github.com/wagoid/estudio-up/compare/v1.0.2...v1.0.3) (2024-08-21)


### Bug Fixes

* remove namespace dos manifests pois é definido pelo flux ([03330ae](https://github.com/wagoid/estudio-up/commit/03330aeafd1879f5a01b4c22049509504b2d007a))

## [1.0.2](https://github.com/wagoid/estudio-up/compare/v1.0.1...v1.0.2) (2024-08-21)


### Bug Fixes

* remove ifs esquecidos no workflow ([4c6d638](https://github.com/wagoid/estudio-up/commit/4c6d63800bf90a29abb9ebdea8e0fcb711d86a96))

## [1.0.1](https://github.com/wagoid/estudio-up/compare/v1.0.0...v1.0.1) (2024-08-21)


### Bug Fixes

* build da imagem no push de tags para gerar as tags de imagem corretas ([0612191](https://github.com/wagoid/estudio-up/commit/06121912cfaa0f69a039f9408e40e07390158a08))

## 1.0.0 (2024-08-21)


### Features

* adiciona arquivos de deployment no kubernetes ([5086094](https://github.com/wagoid/estudio-up/commit/50860941eb4e70bfee537c92668c43bfdc356ce2))
* adiciona autenticação através do Authentik ([ddf7ff3](https://github.com/wagoid/estudio-up/commit/ddf7ff30a8b1c496b1fc98cdf2c07eeffb1df68d))
* adicionada opção de fazer upload do áudio final ([1d51449](https://github.com/wagoid/estudio-up/commit/1d51449bcacb1841e9a0c26ac10ca42a7664556a))
* commit inicial ([21a5998](https://github.com/wagoid/estudio-up/commit/21a59989906265a1dc51375ffe5c203016e12b54))
* migração do banco para PostgreSQL ([04487e5](https://github.com/wagoid/estudio-up/commit/04487e599ae3a43a11fc782eeef0ff279264c2a4))

## 1.0.0 (2024-08-21)


### Features

* adiciona arquivos de deployment no kubernetes ([5086094](https://github.com/wagoid/estudio-up/commit/50860941eb4e70bfee537c92668c43bfdc356ce2))
* adiciona autenticação através do Authentik ([ddf7ff3](https://github.com/wagoid/estudio-up/commit/ddf7ff30a8b1c496b1fc98cdf2c07eeffb1df68d))
* adicionada opção de fazer upload do áudio final ([1d51449](https://github.com/wagoid/estudio-up/commit/1d51449bcacb1841e9a0c26ac10ca42a7664556a))
* commit inicial ([21a5998](https://github.com/wagoid/estudio-up/commit/21a59989906265a1dc51375ffe5c203016e12b54))
* migração do banco para PostgreSQL ([04487e5](https://github.com/wagoid/estudio-up/commit/04487e599ae3a43a11fc782eeef0ff279264c2a4))

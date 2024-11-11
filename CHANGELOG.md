# Changelog

## [1.14.0](https://github.com/wagoid/estudio-up/compare/v1.13.5...v1.14.0) (2024-11-11)


### Features

* adiciona tela para gerenciar vozes ([7456dab](https://github.com/wagoid/estudio-up/commit/7456daba1e1cc5c7e01736501cf0cbcaf2d8867b))
* atualiza as configurações de k8s para deploy na OCI ([c6f5570](https://github.com/wagoid/estudio-up/commit/c6f55704e63ffa5da92fd108ca9559bdc9c814be))
* atualiza o tts para utilizar nossa ferramenta interna no lugar de azure ([c784b59](https://github.com/wagoid/estudio-up/commit/c784b59a1da76ef52e1aaa8c20d94bd0e33ad255))

## [1.13.5](https://github.com/wagoid/estudio-up/compare/v1.13.4...v1.13.5) (2024-09-25)


### Bug Fixes

* nome do bucket nos URLs de audio ([a2a65d0](https://github.com/wagoid/estudio-up/commit/a2a65d07e47b7555966ebd4f0456ee71de0ba69c))

## [1.13.4](https://github.com/wagoid/estudio-up/compare/v1.13.3...v1.13.4) (2024-09-25)


### Bug Fixes

* nome do bucket incorreto ([5801440](https://github.com/wagoid/estudio-up/commit/5801440a3e79067ca879ec687837bb96e3af50d5))

## [1.13.3](https://github.com/wagoid/estudio-up/compare/v1.13.2...v1.13.3) (2024-09-25)


### Bug Fixes

* porta 80 para o service do minio ([bd91a73](https://github.com/wagoid/estudio-up/commit/bd91a733ab104296558845bd20210ddbf2bb9866))

## [1.13.2](https://github.com/wagoid/estudio-up/compare/v1.13.1...v1.13.2) (2024-09-25)


### Bug Fixes

* variaveis de ambiente ([459f90e](https://github.com/wagoid/estudio-up/commit/459f90e60f299501987e84a9f46116831c54e900))

## [1.13.1](https://github.com/wagoid/estudio-up/compare/v1.13.0...v1.13.1) (2024-09-25)


### Bug Fixes

* adiciona Buildx de novo para o setup do cache ([9872f97](https://github.com/wagoid/estudio-up/commit/9872f97d8138466522b81b80e9c77579bc3a0e94))

## [1.13.0](https://github.com/wagoid/estudio-up/compare/v1.12.0...v1.13.0) (2024-09-25)


### Features

* build em amd64 para o novo cluster ([127e71b](https://github.com/wagoid/estudio-up/commit/127e71bea4fbdd2629dfbcf9f9df7fb7ea489ddd))

## [1.12.0](https://github.com/wagoid/estudio-up/compare/v1.11.0...v1.12.0) (2024-09-25)


### Features

* atualização da kustomization para o novo setup ([cc5856c](https://github.com/wagoid/estudio-up/commit/cc5856ca06445ebd3ac16211b9cd33c9f48a5624))

## [1.11.0](https://github.com/wagoid/estudio-up/compare/v1.10.0...v1.11.0) (2024-08-30)


### Features

* melhora a lógica de melhoria de siglas ([f471ceb](https://github.com/wagoid/estudio-up/commit/f471ceb2b3d3f5af3b44bed501381af1f5342eab))

## [1.10.0](https://github.com/wagoid/estudio-up/compare/v1.9.0...v1.10.0) (2024-08-28)


### Features

* utiliza o componente Avatar do MUI para o ícone do usuário ([81d8e6f](https://github.com/wagoid/estudio-up/commit/81d8e6f6bbcdcabc2cae7e5e26d5d41ade963e7a))

## [1.9.0](https://github.com/wagoid/estudio-up/compare/v1.8.0...v1.9.0) (2024-08-26)


### Features

* adiciona spinner no FormSubmitButton ([eda73ff](https://github.com/wagoid/estudio-up/commit/eda73ff82cf6be88842107d402d547441427d437))

## [1.8.0](https://github.com/wagoid/estudio-up/compare/v1.7.3...v1.8.0) (2024-08-26)


### Features

* remove vercel analytics ([d6e026c](https://github.com/wagoid/estudio-up/commit/d6e026c4548215d100d4b8c80a12f6fad4fc46e4))
* só habilita geração de áudio final com pelo menos um capítulo criado ([a279016](https://github.com/wagoid/estudio-up/commit/a279016dc6ac2f656f09025eeab2beda289af8ad))

## [1.7.3](https://github.com/wagoid/estudio-up/compare/v1.7.2...v1.7.3) (2024-08-26)


### Bug Fixes

* mp3wrap estava sendo instalada no estágio errado do Dockerfile ([d41ccc4](https://github.com/wagoid/estudio-up/commit/d41ccc419a0a0841bc856e30b7df164d6d9946ed))

## [1.7.2](https://github.com/wagoid/estudio-up/compare/v1.7.1...v1.7.2) (2024-08-26)


### Bug Fixes

* permissões no Dockerfile de acordo com a imagem Debian ([99a1971](https://github.com/wagoid/estudio-up/commit/99a19715e1c9f444cb387ef3452f6903bcc3f3e5))

## [1.7.1](https://github.com/wagoid/estudio-up/compare/v1.7.0...v1.7.1) (2024-08-26)


### Performance Improvements

* remove todos os arquivos de audio separados ao gerar o arquivo final ([a7d01da](https://github.com/wagoid/estudio-up/commit/a7d01da3bc81b5cbe7581f4334915f669a3d84cb))

## [1.7.0](https://github.com/wagoid/estudio-up/compare/v1.6.0...v1.7.0) (2024-08-25)


### Features

* remove áudio anterior após gerar o novo áudio final ([5bb922b](https://github.com/wagoid/estudio-up/commit/5bb922b925e0f3952591cb486d43e2c6903e61e3))

## [1.6.0](https://github.com/wagoid/estudio-up/compare/v1.5.2...v1.6.0) (2024-08-25)


### Features

* adiciona campo para o tipo de capítulo (Conteúdo ou Descrição de imagem) ([ceb60d7](https://github.com/wagoid/estudio-up/commit/ceb60d7d7e9c7fe2e4f03d3f7acc8793fbc93f4d))

## [1.5.2](https://github.com/wagoid/estudio-up/compare/v1.5.1...v1.5.2) (2024-08-22)


### Bug Fixes

* remove otimização desnecessária de imagem de avatar ([d210a04](https://github.com/wagoid/estudio-up/commit/d210a044822bc47899c8a7ff43d05b3725dc8eb4))

## [1.5.1](https://github.com/wagoid/estudio-up/compare/v1.5.0...v1.5.1) (2024-08-22)


### Bug Fixes

* erro de typescript na build ([0512eb0](https://github.com/wagoid/estudio-up/commit/0512eb02cb64c5622be2490c0a14307f1b80cf2f))

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

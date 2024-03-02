# Remetente de notas escolares por e-mail

---
## Objetivo
Esse projeto foi desenvolvido visando facilitar o dia-a-dia da minha mulher, como representante de turma, ela precisa
enviar as notas para os colegas, individualmente.
Com esse projeto ela consegue carregar uma planilha .csv, contendo as notas e os e-mails particulares de cada colega
e enviar as notas para cada um deles.

## Tecnologias

- ``Angular 17``
- ``TypeScript 5``
- ``HTML``
- ``CSS``

## Funcionalidades

- Carregar um arquivo .csv e enviar as notas contidas nele;
- Baixar um arquivo .csv com o histórico de e-mails enviados;
- Consultar os e-mails enviados filtrando por textos presentes nas informações de cada um deles;
- Baixar uma planilha modelo para ser preenchida com as notas.

## Como usar

Este projeto pode ser usado através do Docker, estando na pasta raiz do projeto basta seguir os passos abaixo:

1) Gerar o arquivo *.jar*: `mvn clean package`
2) Executar o comando: `docker compose up -d`


# Políticas de Pull Requests e Revisões de Código

## 1. Criação de Branches para Cada Feature ou Correção

- Sempre crie uma branch separada para cada nova funcionalidade ou correção de bug. Isso facilita o trabalho em equipe e evita conflitos.
- Use convenções de nomenclatura:
  - `feature/nome-da-feature` para novas funcionalidades.
  - `fix/nome-do-bug` para correções de bugs.

**Passos para Criar uma Branch**:

```bash
git checkout -b feature/cadastro-usuario
```

- Desenvolva suas alterações nesta branch, mantendo a branch `main` ou `dev` sempre estáveis.

## 2. Criando um Pull Request (PR)

Depois de concluir as alterações em uma branch, crie um Pull Request (PR) para solicitar a mesclagem do código na branch principal (geralmente `dev` ou `main`).

**Passos para Criar um PR**:

1. **Push da Sua Branch**: Envie suas alterações para o repositório remoto:

   ```bash
   git push origin feature/cadastro-usuario
   ```

2. **Criar o Pull Request no GitHub**:
   - No GitHub, acesse o repositório do projeto.
   - Clique em "Compare & pull request" ao lado da branch que você acabou de enviar.
   - Escolha a branch de destino (geralmente `dev`).
   - Adicione um título e uma descrição detalhada ao PR, explicando o que foi alterado, por quê foi alterado e como utilizar as alterações, se necessário.
   - Solicite revisão de um ou mais revisores da equipe.

## 3. Revisão de Código e Mesclagem

A revisão de código é essencial para garantir a qualidade do software e para aprender com os outros membros da equipe.

**Práticas para Revisão de Código**:

- **Outro Membro Deve Revisar o PR**: Nunca mescle suas próprias alterações sem revisão. Sempre solicite que outro membro da equipe revise seu PR.
- **Dicas para Revisores**:
  - Entenda o Contexto: Leia a descrição do PR para entender a proposta da alteração.
  - Verifique o Código: Analise se o código está de acordo com os padrões da equipe e se cumpre o que foi proposto.
  - Teste: Se possível, teste as alterações para confirmar que estão funcionando corretamente.

**Mesclagem do PR**:

- Depois que o PR for aprovado, certifique-se de que não haja conflitos antes de prosseguir.
- Mescle o PR na branch de destino usando a opção de mesclagem no GitHub.

## 4. Descrição Detalhada dos PRs

Uma boa descrição do PR é importante para ajudar revisores e futuros desenvolvedores a entenderem as alterações realizadas.

**O que Incluir na Descrição do PR**:

- **Motivo da Alteração**: Qual problema está sendo resolvido ou qual funcionalidade está sendo adicionada.
- **Resumo das Alterações**: O que foi alterado no código.
- **Como Testar**: Quais são os passos para testar as novas funcionalidades ou correções.
- **Referência a Issues**: Caso o PR esteja relacionado a alguma issue, adicione um link ou referência para ela (ex: `Closes #12`).

## 5. Benefícios de Seguir Essas Práticas

- **Qualidade do Código**: Revisões garantem que o código está de acordo com os padrões da equipe e que erros são detectados antes da mesclagem.
- **Colaboração**: Todos os membros da equipe se envolvem e aprendem uns com os outros, o que melhora o conhecimento geral do projeto.
- **Organização**: Manter branches separadas para cada feature ou correção facilita o desenvolvimento paralelo e reduz a chance de conflitos.

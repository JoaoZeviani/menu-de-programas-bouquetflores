# Menu de Aplicativos Bouquet Flores

Menu simples para acessar os três aplicativos da Bouquet Flores hospedados no GitHub Pages:

- Auxiliar de Impressão
- Auxiliar de Catálogo
- Auxiliar de Orçamento

## O que foi incluído

- Novo ícone do app **Menu de Aplicativos** em `icons/`.
- Ícones PWA em 192x192, 512x512, Apple Touch e favicon.
- Cards dos três aplicativos usando os ícones que ficam nos `assets` dos próprios repositórios.
- Fallback automático: se um caminho de ícone mudar, o menu tenta outros caminhos comuns antes de mostrar o símbolo simples.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub, por exemplo: `menu-programas-bouquetflores`.
2. Clique em **Add file > Upload files**.
3. Envie todos os arquivos e pastas deste pacote.
4. Clique em **Commit changes**.
5. Vá em **Settings > Pages**.
6. Em **Build and deployment**, escolha:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Pasta: **/root**
7. Salve.

Depois de alguns minutos, o menu ficará disponível em um endereço parecido com:

`https://joaozeviani.github.io/menu-programas-bouquetflores/`

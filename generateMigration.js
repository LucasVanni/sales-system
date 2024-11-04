// generateMigration.js
const { execSync } = require('child_process');

const migrationName = process.argv[2]; // Pega o primeiro argumento passado
if (!migrationName) {
  console.error('Por favor, forneça o nome da migração.');
  process.exit(1);
}

// Defina o caminho onde você deseja salvar a migração
const outputPath = './src/migration'; // Altere conforme necessário

// O caminho para o arquivo de configuração do DataSource
const dataSourcePath = './src/config/typeorm.ts';

// O comando agora inclui o caminho do arquivo de migração e o DataSource
const command = `ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate ${outputPath}/${migrationName} -d ${dataSourcePath}`;
execSync(command, { stdio: 'inherit' });

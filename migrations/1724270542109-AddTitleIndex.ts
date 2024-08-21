import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddTitleIndex1724270542109 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pg_trgm')
    await queryRunner.query(
      "CREATE INDEX recording_titletext_idx ON recording USING GIN ((data->'title'->>'text') gin_trgm_ops)",
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS recording_titletext_idx')
  }
}

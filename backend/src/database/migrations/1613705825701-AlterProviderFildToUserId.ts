import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AlterProviderFildToUserId1613705825701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'userId',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentsUser',
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentsUser');

    await queryRunner.dropColumn('appointments', 'userId');

    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar',
      isNullable: false,
    }));
  }
}

import { IntrospectionEngine } from '../../IntrospectionEngine'

test('introspection basic', async () => {
  const engine = new IntrospectionEngine({
    cwd: __dirname,
  })

  const url = `file:./blog.db`

  const schema = `datasource ds {
    provider = "sqlite"
    url = "${url}"
  }`

  const result = await engine.introspect(schema)
  expect(result).toMatchInlineSnapshot(`
    Object {
      "datamodel": "datasource ds {
      provider = \\"sqlite\\"
      url      = \\"file:./blog.db\\"
    }

    model Post {
      author    Int
      content   String?
      /// The value of this field is generated by the database as: \`'1970-01-01 00:00:00'\`.
      createdAt DateTime @default(dbgenerated())
      kind      String?
      published Boolean  @default(false)
      title     String   @default(\\"\\")
      /// The value of this field is generated by the database as: \`'1970-01-01 00:00:00'\`.
      updatedAt DateTime @default(dbgenerated())
      uuid      String   @id
      User      User     @relation(fields: [author], references: [id])
    }

    model User {
      age     Int     @default(0)
      amount  Float   @default(0)
      balance Float   @default(0)
      email   String  @unique @default(\\"\\")
      id      Int     @id @default(autoincrement())
      name    String?
      role    String  @default(\\"USER\\")
      Post    Post[]
    }
    ",
      "version": "NonPrisma",
      "warnings": Array [],
    }
  `)
  const metadata = await engine.getDatabaseMetadata(schema)
  expect(metadata).toMatchInlineSnapshot(`
    Object {
      "size_in_bytes": 53248,
      "table_count": 3,
    }
  `)
  const databases = await engine.listDatabases(schema)
  expect(databases).toMatchInlineSnapshot(`
    Array [
      "blog.db",
      "blog.db",
    ]
  `)

  const dbVersion = await engine.getDatabaseVersion(schema)
  expect(dbVersion.length > 0).toBe(true)

  const description = await engine.getDatabaseDescription(schema)

  expect(description).toMatchInlineSnapshot(`
    "SqlSchema {
        tables: [
            Table {
                name: \\"Post\\",
                columns: [
                    Column {
                        name: \\"author\\",
                        tpe: ColumnType {
                            data_type: \\"INTEGER\\",
                            full_data_type: \\"INTEGER\\",
                            character_maximum_length: None,
                            family: Int,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"content\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Nullable,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"createdAt\\",
                        tpe: ColumnType {
                            data_type: \\"DATE\\",
                            full_data_type: \\"DATE\\",
                            character_maximum_length: None,
                            family: DateTime,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: DBGENERATED(
                                    \\"\\\\'1970-01-01 00:00:00\\\\'\\",
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"kind\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Nullable,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"published\\",
                        tpe: ColumnType {
                            data_type: \\"BOOLEAN\\",
                            full_data_type: \\"BOOLEAN\\",
                            character_maximum_length: None,
                            family: Boolean,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    Boolean(
                                        false,
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"title\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    String(
                                        \\"\\",
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"updatedAt\\",
                        tpe: ColumnType {
                            data_type: \\"DATE\\",
                            full_data_type: \\"DATE\\",
                            character_maximum_length: None,
                            family: DateTime,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: DBGENERATED(
                                    \\"\\\\'1970-01-01 00:00:00\\\\'\\",
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"uuid\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                ],
                indices: [
                    Index {
                        name: \\"Post.uuid\\",
                        columns: [
                            \\"uuid\\",
                        ],
                        tpe: Unique,
                    },
                ],
                primary_key: Some(
                    PrimaryKey {
                        columns: [
                            \\"uuid\\",
                        ],
                        sequence: None,
                        constraint_name: None,
                    },
                ),
                foreign_keys: [
                    ForeignKey {
                        constraint_name: None,
                        columns: [
                            \\"author\\",
                        ],
                        referenced_table: \\"User\\",
                        referenced_columns: [
                            \\"id\\",
                        ],
                        on_delete_action: Restrict,
                        on_update_action: NoAction,
                    },
                ],
            },
            Table {
                name: \\"User\\",
                columns: [
                    Column {
                        name: \\"age\\",
                        tpe: ColumnType {
                            data_type: \\"INTEGER\\",
                            full_data_type: \\"INTEGER\\",
                            character_maximum_length: None,
                            family: Int,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    Int(
                                        0,
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"amount\\",
                        tpe: ColumnType {
                            data_type: \\"REAL\\",
                            full_data_type: \\"REAL\\",
                            character_maximum_length: None,
                            family: Decimal,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    Float(
                                        BigDecimal(\\"0\\"),
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"balance\\",
                        tpe: ColumnType {
                            data_type: \\"REAL\\",
                            full_data_type: \\"REAL\\",
                            character_maximum_length: None,
                            family: Decimal,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    Float(
                                        BigDecimal(\\"0\\"),
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"email\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    String(
                                        \\"\\",
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                    Column {
                        name: \\"id\\",
                        tpe: ColumnType {
                            data_type: \\"INTEGER\\",
                            full_data_type: \\"INTEGER\\",
                            character_maximum_length: None,
                            family: Int,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: true,
                    },
                    Column {
                        name: \\"name\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Nullable,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"role\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: Some(
                            DefaultValue {
                                kind: VALUE(
                                    String(
                                        \\"USER\\",
                                    ),
                                ),
                                constraint_name: None,
                            },
                        ),
                        auto_increment: false,
                    },
                ],
                indices: [
                    Index {
                        name: \\"User.email\\",
                        columns: [
                            \\"email\\",
                        ],
                        tpe: Unique,
                    },
                    Index {
                        name: \\"User.id\\",
                        columns: [
                            \\"id\\",
                        ],
                        tpe: Unique,
                    },
                ],
                primary_key: Some(
                    PrimaryKey {
                        columns: [
                            \\"id\\",
                        ],
                        sequence: None,
                        constraint_name: None,
                    },
                ),
                foreign_keys: [],
            },
            Table {
                name: \\"_Migration\\",
                columns: [
                    Column {
                        name: \\"revision\\",
                        tpe: ColumnType {
                            data_type: \\"INTEGER\\",
                            full_data_type: \\"INTEGER\\",
                            character_maximum_length: None,
                            family: Int,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: true,
                    },
                    Column {
                        name: \\"name\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"datamodel\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"status\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"applied\\",
                        tpe: ColumnType {
                            data_type: \\"INTEGER\\",
                            full_data_type: \\"INTEGER\\",
                            character_maximum_length: None,
                            family: Int,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"rolled_back\\",
                        tpe: ColumnType {
                            data_type: \\"INTEGER\\",
                            full_data_type: \\"INTEGER\\",
                            character_maximum_length: None,
                            family: Int,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"datamodel_steps\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"database_migration\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"errors\\",
                        tpe: ColumnType {
                            data_type: \\"TEXT\\",
                            full_data_type: \\"TEXT\\",
                            character_maximum_length: None,
                            family: String,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"started_at\\",
                        tpe: ColumnType {
                            data_type: \\"DATE\\",
                            full_data_type: \\"DATE\\",
                            character_maximum_length: None,
                            family: DateTime,
                            arity: Required,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                    Column {
                        name: \\"finished_at\\",
                        tpe: ColumnType {
                            data_type: \\"DATE\\",
                            full_data_type: \\"DATE\\",
                            character_maximum_length: None,
                            family: DateTime,
                            arity: Nullable,
                            native_type: None,
                        },
                        default: None,
                        auto_increment: false,
                    },
                ],
                indices: [],
                primary_key: Some(
                    PrimaryKey {
                        columns: [
                            \\"revision\\",
                        ],
                        sequence: None,
                        constraint_name: None,
                    },
                ),
                foreign_keys: [],
            },
        ],
        enums: [],
        sequences: [],
    }"
  `)
  engine.stop()
})

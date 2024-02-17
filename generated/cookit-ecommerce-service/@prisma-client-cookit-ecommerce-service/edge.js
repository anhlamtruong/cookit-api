
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  detectRuntime,
} = require('./runtime/edge.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.9.1
 * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
 */
Prisma.prismaVersion = {
  client: "5.9.1",
  engine: "23fdc5965b1e05fc54e5f26ed3de66776b93de64"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.StoreScalarFieldEnum = {
  id: 'id',
  name: 'name',
  userId: 'userId',
  description: 'description',
  imageUrl: 'imageUrl',
  status: 'status',
  createAt: 'createAt',
  updateAt: 'updateAt'
};

exports.Prisma.BillboardScalarFieldEnum = {
  id: 'id',
  storeId: 'storeId',
  label: 'label',
  imageUrl: 'imageUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  storeId: 'storeId',
  billboardId: 'billboardId',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChefScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  bio: 'bio',
  profilePicture: 'profilePicture',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MenuScalarFieldEnum = {
  id: 'id',
  storeId: 'storeId',
  name: 'name',
  chefId: 'chefId',
  sizeId: 'sizeId',
  categoryId: 'categoryId',
  title: 'title',
  description: 'description',
  pickupDate: 'pickupDate',
  price: 'price',
  isFeatured: 'isFeatured',
  isArchived: 'isArchived',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ChefScheduleScalarFieldEnum = {
  id: 'id',
  menuId: 'menuId',
  chefId: 'chefId',
  date: 'date'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  status: 'status',
  isPaid: 'isPaid',
  phone: 'phone',
  address: 'address',
  orderDate: 'orderDate',
  totalAmount: 'totalAmount',
  notes: 'notes',
  storeId: 'storeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  menuId: 'menuId',
  quantity: 'quantity',
  unitPrice: 'unitPrice'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  storeId: 'storeId',
  name: 'name',
  quantity: 'quantity',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ImageScalarFieldEnum = {
  id: 'id',
  menuId: 'menuId',
  url: 'url',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.StoreStatus = exports.$Enums.StoreStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PLACED: 'PLACED',
  PAID: 'PAID',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

exports.Prisma.ModelName = {
  Store: 'Store',
  Billboard: 'Billboard',
  Category: 'Category',
  Chef: 'Chef',
  Menu: 'Menu',
  ChefSchedule: 'ChefSchedule',
  Order: 'Order',
  OrderItem: 'OrderItem',
  Size: 'Size',
  Image: 'Image'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "D:\\Fall2022\\Webiste\\cookit-api\\generated\\cookit-ecommerce-service\\@prisma-client-cookit-ecommerce-service",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma/cookit-ecommerce-service",
  "clientVersion": "5.9.1",
  "engineVersion": "23fdc5965b1e05fc54e5f26ed3de66776b93de64",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mongodb",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "STORE_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwNCi8vIGxlYXJuIG1vcmUgYWJvdXQgaXQgaW4gdGhlIGRvY3M6IGh0dHBzOi8vcHJpcy5seS9kL3ByaXNtYS1zY2hlbWENCg0KZ2VuZXJhdG9yIGNsaWVudCB7DQogIHByb3ZpZGVyID0gInByaXNtYS1jbGllbnQtanMiDQogIG91dHB1dCAgID0gIi4uLy4uL2dlbmVyYXRlZC9jb29raXQtZWNvbW1lcmNlLXNlcnZpY2UvQHByaXNtYS1jbGllbnQtY29va2l0LWVjb21tZXJjZS1zZXJ2aWNlIg0KfQ0KDQpkYXRhc291cmNlIGRiIHsNCiAgcHJvdmlkZXIgPSAibW9uZ29kYiINCiAgdXJsID0gZW52KCJTVE9SRV9EQVRBQkFTRV9VUkwiKQ0KfQ0KDQoNCm1vZGVsIFN0b3JlIHsNCiAgaWQgU3RyaW5nICAgICAgICAgICAgICAgICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZA0KICBuYW1lIFN0cmluZyAgICAgICAgICAgICAgICAgQHVuaXF1ZQ0KICB1c2VySWQgU3RyaW5nDQogIGRlc2NyaXB0aW9uIFN0cmluZz8NCiAgaW1hZ2VVcmwgU3RyaW5nPw0KICBzdGF0dXMgU3RvcmVTdGF0dXMgICAgICAgICAgQGRlZmF1bHQoQUNUSVZFKQ0KICBtZW51cyBNZW51W10gICAgICAgICAgICAgICAgDQogIGJpbGxib2FyZHMgQmlsbGJvYXJkW10gDQogIGNhdGVnb3JpZXMgQ2F0ZWdvcnlbXSAgICAgICANCiAgb3JkZXIgT3JkZXJbXSAgICAgICAgICAgICAgIA0KICBzaXplcyBTaXplW10gICAgICAgICAgICAgICAgQHJlbGF0aW9uKCJTdG9yZVRvU2l6ZSIpDQogIGNyZWF0ZUF0IERhdGVUaW1lICAgICAgICAgICBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlQXQgRGF0ZVRpbWUgICAgICAgICAgIEB1cGRhdGVkQXQNCn0NCg0KbW9kZWwgQmlsbGJvYXJkew0KICBpZCBTdHJpbmcgICAgICAgICAgICAgICAgICAgQGlkIEBkZWZhdWx0KGF1dG8oKSkgQG1hcCgiX2lkIikgQGRiLk9iamVjdElkDQogIHN0b3JlSWQgU3RyaW5nICAgICAgICAgICAgICBAZGIuT2JqZWN0SWQNCiAgc3RvcmUgU3RvcmUgICAgICAgICAgICAgICAgIEByZWxhdGlvbiggZmllbGRzOiBbc3RvcmVJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIGxhYmVsIFN0cmluZw0KICBpbWFnZVVybCBTdHJpbmcNCiAgY2F0ZWdvcmllcyBDYXRlZ29yeVtdDQogIGNyZWF0ZWRBdCBEYXRlVGltZSAgICAgICAgICBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlZEF0IERhdGVUaW1lICAgICAgICAgIEB1cGRhdGVkQXQNCg0KICBAQGluZGV4KFtzdG9yZUlkXSkNCn0NCm1vZGVsIENhdGVnb3J5IHsNCiAgaWQgICAgICAgICAgU3RyaW5nICAgICAgQGlkIEBkZWZhdWx0KGF1dG8oKSkgQG1hcCgiX2lkIikgQGRiLk9iamVjdElkDQogIHN0b3JlSWQgICAgIFN0cmluZyAgICAgIEBkYi5PYmplY3RJZA0KICBzdG9yZSAgICAgICBTdG9yZSAgICAgICBAcmVsYXRpb24oIGZpZWxkczogW3N0b3JlSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBiaWxsYm9hcmRJZCBTdHJpbmcgICAgICBAZGIuT2JqZWN0SWQNCiAgYmlsbGJvYXJkICAgQmlsbGJvYXJkICAgQHJlbGF0aW9uKGZpZWxkczogW2JpbGxib2FyZElkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgbmFtZSAgICAgICAgU3RyaW5nDQogIG1lbnVzICAgICAgIE1lbnVbXSAgICAgIA0KICBjcmVhdGVkQXQgICBEYXRlVGltZSAgICBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlZEF0ICAgRGF0ZVRpbWUgICAgQHVwZGF0ZWRBdA0KDQogIEBAaW5kZXgoW3N0b3JlSWRdKQ0KICBAQGluZGV4KFtiaWxsYm9hcmRJZF0pDQp9DQoNCm1vZGVsIENoZWYgew0KICBpZCAgICAgICAgICAgICBTdHJpbmcgICAgICAgICBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQNCiAgdXNlcklkICAgICAgICAgSW50ICAgICAgICAgLy8gTGluayB0byB0aGUgVXNlciBJRCBpbiB0aGUgYXV0aGVudGljYXRpb24gc2VydmljZQ0KICBiaW8gICAgICAgICAgICBTdHJpbmc/DQogIHByb2ZpbGVQaWN0dXJlIFN0cmluZz8NCiAgY3JlYXRlZEF0ICAgICAgRGF0ZVRpbWUgICAgICAgQGRlZmF1bHQobm93KCkpDQogIHVwZGF0ZWRBdCAgICAgIERhdGVUaW1lICAgICAgIEB1cGRhdGVkQXQNCiAgbWVudXMgICAgICAgICAgICAgTWVudVtdDQogIHNjaGVkdWxlcyAgICAgICAgIENoZWZTY2hlZHVsZVtdIEByZWxhdGlvbigiQ2hlZlRvQ2hlZlNjaGVkdWxlIikNCiAgLy8gLi4uIG90aGVyIGZpZWxkcyBzcGVjaWZpYyB0byB0aGUgY2hlZiAuLi4NCn0NCg0KbW9kZWwgTWVudSB7DQogIGlkICAgICAgICAgICAgICAgIFN0cmluZyAgICAgICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZA0KICBzdG9yZUlkICAgICAgICAgICBTdHJpbmcgICAgICAgICBAZGIuT2JqZWN0SWQNCiAgc3RvcmUgICAgICAgICAgICAgU3RvcmUgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3N0b3JlSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBuYW1lICAgICAgICAgICAgICBTdHJpbmcNCiAgY2hlZklkICAgICAgICAgICAgU3RyaW5nICAgICAgICAgQGRiLk9iamVjdElkDQogIGNoZWYgICAgICAgICAgICAgIENoZWYgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjaGVmSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBvcmRlckl0ZW1zICAgICAgICBPcmRlckl0ZW1bXSAgICANCiAgaW1hZ2VzICAgICAgICAgICAgSW1hZ2VbXQ0KICBzaXplSWQgICAgICAgICAgICBTdHJpbmcgICAgICAgICBAZGIuT2JqZWN0SWQNCiAgc2l6ZSAgICAgICAgICAgICAgU2l6ZSAgICAgICAgICAgQHJlbGF0aW9uKGZpZWxkczogW3NpemVJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIGNhdGVnb3J5SWQgICAgICAgIFN0cmluZyAgICAgICAgIEBkYi5PYmplY3RJZA0KICBjYXRlZ29yeSAgICAgICAgICBDYXRlZ29yeSAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbY2F0ZWdvcnlJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIHRpdGxlICAgICAgICAgICAgIFN0cmluZz8NCiAgZGVzY3JpcHRpb24gICAgICAgU3RyaW5nPw0KICBwaWNrdXBEYXRlICAgICAgICBEYXRlVGltZT8gICAgICAgLy8gV2hlbiB0aGUgY3VzdG9tZXIgcGxhbnMgdG8gcGljayB1cCB0aGUgb3JkZXINCiAgcHJpY2UgICAgICAgICAgICAgRmxvYXQNCiAgaXNGZWF0dXJlZCAgICAgICAgQm9vbGVhbiAgICAgICAgIEBkZWZhdWx0KGZhbHNlKQ0KICBpc0FyY2hpdmVkICAgICAgICBCb29sZWFuICAgICAgICAgQGRlZmF1bHQoZmFsc2UpDQogIGF2YWlsYWJsZURhdGVzICAgIENoZWZTY2hlZHVsZVtdICBAcmVsYXRpb24oIk1lbnVUb0NoZWZTY2hlZHVsZSIpDQogIGNyZWF0ZWRBdCAgICAgICAgIERhdGVUaW1lICAgICAgICBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlZEF0ICAgICAgICAgRGF0ZVRpbWUgICAgICAgIEB1cGRhdGVkQXQNCg0KICBAQGluZGV4KFtzdG9yZUlkXSkNCiAgQEBpbmRleChbY2hlZklkXSkNCiAgQEBpbmRleChbY2F0ZWdvcnlJZF0pDQogIEBAaW5kZXgoW3NpemVJZF0pDQogIC8vIC4uLiBvdGhlciBmaWVsZHMgLi4uDQp9DQoNCm1vZGVsIENoZWZTY2hlZHVsZSB7DQogIGlkICAgICAgICAgICAgICAgIFN0cmluZyAgICAgICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZA0KICBtZW51SWQgICAgICAgICAgICBTdHJpbmcgICAgICAgICBAZGIuT2JqZWN0SWQNCiAgY2hlZklkICAgICAgICAgICAgU3RyaW5nICAgICAgICAgQGRiLk9iamVjdElkDQogIGNoZWYgICAgICAgICAgICAgIENoZWYgICAgICAgICAgIEByZWxhdGlvbigiQ2hlZlRvQ2hlZlNjaGVkdWxlIixmaWVsZHM6IFtjaGVmSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBtZW51ICAgICAgICAgICAgICBNZW51ICAgICAgICAgICBAcmVsYXRpb24oIk1lbnVUb0NoZWZTY2hlZHVsZSIsZmllbGRzOiBbbWVudUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgZGF0ZSAgICAgICAgICAgICAgRGF0ZVRpbWUgICAgDQogIEBAaW5kZXgoW2NoZWZJZF0pDQogIEBAaW5kZXgoW21lbnVJZF0pDQp9DQoNCm1vZGVsIE9yZGVyIHsNCiAgaWQgICAgICAgICAgICAgICAgU3RyaW5nICAgIEBpZCBAZGVmYXVsdChhdXRvKCkpIEBtYXAoIl9pZCIpIEBkYi5PYmplY3RJZA0KICBjdXN0b21lcklkICAgICAgICBTdHJpbmcgICAgICAgICAvLyBMaW5rIHRvIHRoZSBVc2VyIElEIGluIHRoZSBhdXRoZW50aWNhdGlvbiBzZXJ2aWNlDQogIG9yZGVySXRlbXMgICAgICAgIE9yZGVySXRlbVtdIC8vIFJlbGF0aW9uIHRvIE9yZGVySXRlbSBtb2RlbA0KICBzdGF0dXMgICAgICAgICAgICBPcmRlclN0YXR1cw0KICBpc1BhaWQgICAgIEJvb2xlYW4gICBAZGVmYXVsdChmYWxzZSkNCiAgcGhvbmUgICAgICBTdHJpbmcgICAgQGRlZmF1bHQoIiIpDQogIGFkZHJlc3MgICAgU3RyaW5nICAgIEBkZWZhdWx0KCIiKQ0KICBvcmRlckRhdGUgICAgICAgICBEYXRlVGltZSAgICBAZGVmYXVsdChub3coKSkNCiAgdG90YWxBbW91bnQgRmxvYXQgICAgICAgLy8gQ2FsY3VsYXRlZCB0b3RhbCBjb3N0IG9mIHRoZSBvcmRlcg0KICBub3RlcyAgICAgICBTdHJpbmc/ICAgICAvLyBTcGVjaWFsIGluc3RydWN0aW9ucyBvciByZXF1ZXN0cw0KICBzdG9yZUlkICAgIFN0cmluZyAgIEBkYi5PYmplY3RJZA0KICBzdG9yZSAgICAgIFN0b3JlICAgIEByZWxhdGlvbihmaWVsZHM6IFtzdG9yZUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgY3JlYXRlZEF0IERhdGVUaW1lICBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlZEF0IERhdGVUaW1lICBAdXBkYXRlZEF0DQogIEBAaW5kZXgoW3N0b3JlSWRdKQ0KICAvLyAuLi4gb3RoZXIgZmllbGRzIC4uLg0KfQ0KDQptb2RlbCBPcmRlckl0ZW0gew0KICBpZCAgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICBAaWQgQGRlZmF1bHQoYXV0bygpKSBAbWFwKCJfaWQiKSBAZGIuT2JqZWN0SWQNCiAgb3JkZXJJZCAgICAgICAgICAgU3RyaW5nICAgICAgQGRiLk9iamVjdElkDQogIG9yZGVyICAgICAgICAgICAgIE9yZGVyICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtvcmRlcklkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgbWVudUlkICAgICAgICAgICAgU3RyaW5nICAgICAgQGRiLk9iamVjdElkDQogIG1lbnUgICAgICAgICAgICAgIE1lbnUgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFttZW51SWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBxdWFudGl0eSAgICAgICAgICBJbnQ/DQogIHVuaXRQcmljZSAgRmxvYXQgICAvLyBQcmljZSBvZiB0aGUgaXRlbSBhdCB0aGUgdGltZSBvZiBvcmRlcg0KICBAQGluZGV4KFtvcmRlcklkXSkNCiAgQEBpbmRleChbbWVudUlkXSkNCiAgDQogIC8vIC4uLiBvdGhlciBmaWVsZHMgLi4uDQp9DQoNCm1vZGVsIFNpemUgew0KICBpZCAgICAgICAgICBTdHJpbmcgICAgQGlkIEBkZWZhdWx0KGF1dG8oKSkgQG1hcCgiX2lkIikgQGRiLk9iamVjdElkDQogIHN0b3JlSWQgICAgIFN0cmluZyAgICBAZGIuT2JqZWN0SWQNCiAgc3RvcmUgICAgICAgU3RvcmUgICAgIEByZWxhdGlvbigiU3RvcmVUb1NpemUiLCBmaWVsZHM6IFtzdG9yZUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgbmFtZSAgICAgICAgU3RyaW5nDQogIHF1YW50aXR5ICAgIFN0cmluZw0KICBtZW51cyAgICAgICBNZW51W10gICAgLy8gUmVsYXRpb24gdG8gUHJvZHVjdCBtb2RlbA0KICBjcmVhdGVkQXQgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpDQogIHVwZGF0ZWRBdCAgIERhdGVUaW1lICBAdXBkYXRlZEF0DQoNCiAgQEBpbmRleChbc3RvcmVJZF0pDQp9DQoNCm1vZGVsIEltYWdlIHsNCiAgaWQgICAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGF1dG8oKSkgQG1hcCgiX2lkIikgQGRiLk9iamVjdElkDQogIG1lbnVJZCAgICAgIFN0cmluZyAgIEBkYi5PYmplY3RJZA0KICBtZW51ICAgICAgICBNZW51ICAgICBAcmVsYXRpb24oZmllbGRzOiBbbWVudUlkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpDQogIHVybCAgICAgICAgIFN0cmluZyAgIC8vIFVSTCBvZiB0aGUgaW1hZ2UNCiAgY3JlYXRlZEF0ICAgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpDQogIHVwZGF0ZWRBdCAgIERhdGVUaW1lIEB1cGRhdGVkQXQNCg0KICBAQGluZGV4KFttZW51SWRdKQ0KfQ0KDQoNCmVudW0gT3JkZXJTdGF0dXMgew0KICBQTEFDRUQNCiAgUEFJRA0KICBDQU5DRUxMRUQNCiAgQ09NUExFVEVEDQp9DQplbnVtIFN0b3JlU3RhdHVzIHsNCiAgQUNUSVZFDQogIElOQUNUSVZFDQp9DQo=",
  "inlineSchemaHash": "ad8f89ed081626563b6c265b889925870b1491d65534fd4a53804524524b0bfa"
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Store\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StoreStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToStore\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billboards\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Billboard\",\"relationName\":\"BillboardToStore\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categories\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"CategoryToStore\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToStore\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sizes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Size\",\"relationName\":\"StoreToSize\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updateAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Billboard\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"BillboardToStore\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categories\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"BillboardToCategory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Category\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"CategoryToStore\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billboardId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billboard\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Billboard\",\"relationName\":\"BillboardToCategory\",\"relationFromFields\":[\"billboardId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"CategoryToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Chef\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profilePicture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"ChefToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"schedules\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChefSchedule\",\"relationName\":\"ChefToChefSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Menu\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"MenuToStore\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chefId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chef\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chef\",\"relationName\":\"ChefToMenu\",\"relationFromFields\":[\"chefId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderItem\",\"relationName\":\"MenuToOrderItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Image\",\"relationName\":\"ImageToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sizeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"size\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Size\",\"relationName\":\"MenuToSize\",\"relationFromFields\":[\"sizeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"CategoryToMenu\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFeatured\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isArchived\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"availableDates\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChefSchedule\",\"relationName\":\"MenuToChefSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChefSchedule\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menuId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chefId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chef\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chef\",\"relationName\":\"ChefToChefSchedule\",\"relationFromFields\":[\"chefId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToChefSchedule\",\"relationFromFields\":[\"menuId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Order\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderItem\",\"relationName\":\"OrderToOrderItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"OrderToStore\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OrderItem\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToOrderItem\",\"relationFromFields\":[\"orderId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menuId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToOrderItem\",\"relationFromFields\":[\"menuId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unitPrice\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Size\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"StoreToSize\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToSize\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Image\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"auto\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menuId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"ImageToMenu\",\"relationFromFields\":[\"menuId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"OrderStatus\":{\"values\":[{\"name\":\"PLACED\",\"dbName\":null},{\"name\":\"PAID\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null}],\"dbName\":null},\"StoreStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INACTIVE\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    STORE_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['STORE_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.STORE_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


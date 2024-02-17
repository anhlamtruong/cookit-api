
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
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

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
  categoryId: 'categoryId',
  sizeId: 'sizeId',
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

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
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
      "value": "D:\\Fall2022\\Webiste\\cookit\\generated\\mysql\\@prisma-client-mysql",
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
  "relativePath": "../../../prisma/mysql",
  "clientVersion": "5.9.1",
  "engineVersion": "23fdc5965b1e05fc54e5f26ed3de66776b93de64",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "MYSQL_DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Ly8gVGhpcyBpcyB5b3VyIFByaXNtYSBzY2hlbWEgZmlsZSwNCi8vIGxlYXJuIG1vcmUgYWJvdXQgaXQgaW4gdGhlIGRvY3M6IGh0dHBzOi8vcHJpcy5seS9kL3ByaXNtYS1zY2hlbWENCg0KZ2VuZXJhdG9yIGNsaWVudCB7DQogIHByb3ZpZGVyID0gInByaXNtYS1jbGllbnQtanMiDQogIG91dHB1dCAgID0gIi4uLy4uL2dlbmVyYXRlZC9teXNxbC9AcHJpc21hLWNsaWVudC1teXNxbCINCn0NCg0KZGF0YXNvdXJjZSBkYiB7DQogIHByb3ZpZGVyID0gIm15c3FsIg0KICB1cmwgPSBlbnYoIk1ZU1FMX0RBVEFCQVNFX1VSTCIpDQogIHJlbGF0aW9uTW9kZSA9ICJwcmlzbWEiDQp9DQoNCg0KbW9kZWwgU3RvcmUgew0KICBpZCBTdHJpbmcgQGlkIEBkZWZhdWx0KHV1aWQoKSkNCiAgbmFtZSBTdHJpbmcgQHVuaXF1ZQ0KICB1c2VySWQgU3RyaW5nDQogIGRlc2NyaXB0aW9uIFN0cmluZz8NCiAgaW1hZ2VVcmwgU3RyaW5nPw0KICBzdGF0dXMgICAgICBTdG9yZVN0YXR1cyAgICBAZGVmYXVsdChBQ1RJVkUpDQogIG1lbnVzICAgICAgTWVudVtdIEByZWxhdGlvbigiU3RvcmVUb01lbnUiKQ0KICBiaWxsYm9hcmRzIEJpbGxib2FyZFtdIEByZWxhdGlvbigiU3RvcmVUb0JpbGxib2FyZCIpDQogIGNhdGVnb3JpZXMgICAgICBDYXRlZ29yeVtdIEByZWxhdGlvbigiU3RvcmVUb0NhdGVnb3J5IikNCiAgb3JkZXIgT3JkZXJbXSBAcmVsYXRpb24oIlN0b3JlVG9PcmRlciIpDQogIHNpemVzICAgICAgICAgICBTaXplW10gICAgIEByZWxhdGlvbigiU3RvcmVUb1NpemUiKQ0KICBjcmVhdGVBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdA0KfQ0KDQptb2RlbCBCaWxsYm9hcmR7DQogIGlkIFN0cmluZyBAaWQgQGRlZmF1bHQodXVpZCgpKQ0KICBzdG9yZUlkIFN0cmluZw0KICBzdG9yZSBTdG9yZSBAcmVsYXRpb24oIlN0b3JlVG9CaWxsYm9hcmQiLCBmaWVsZHM6IFtzdG9yZUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgDQogIGxhYmVsIFN0cmluZw0KICBpbWFnZVVybCBTdHJpbmcNCiAgY2F0ZWdvcmllcyAgQ2F0ZWdvcnlbXQ0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpDQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0DQoNCiAgQEBpbmRleChbc3RvcmVJZF0pDQp9DQptb2RlbCBDYXRlZ29yeSB7DQogIGlkICAgICAgICAgIFN0cmluZyAgICAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpDQogIHN0b3JlSWQgICAgIFN0cmluZyAgICAgIC8vIEZvcmVpZ24gS2V5IHRvIFN0b3JlDQogIHN0b3JlICAgICAgIFN0b3JlICAgICAgIEByZWxhdGlvbigiU3RvcmVUb0NhdGVnb3J5IiwgZmllbGRzOiBbc3RvcmVJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIGJpbGxib2FyZElkIFN0cmluZyAgICAgIC8vIEZvcmVpZ24gS2V5IHRvIEJpbGxib2FyZA0KICBiaWxsYm9hcmQgICBCaWxsYm9hcmQgICBAcmVsYXRpb24oZmllbGRzOiBbYmlsbGJvYXJkSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBuYW1lICAgICAgICBTdHJpbmcNCiAgbWVudXMgICAgICAgTWVudVtdICAgICAgQHJlbGF0aW9uKCJDYXRlZ29yeVRvTWVudSIpDQogIGNyZWF0ZWRBdCAgIERhdGVUaW1lICAgIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgICBEYXRlVGltZSAgICBAdXBkYXRlZEF0DQoNCiAgQEBpbmRleChbc3RvcmVJZF0pDQogIEBAaW5kZXgoW2JpbGxib2FyZElkXSkNCn0NCg0KbW9kZWwgQ2hlZiB7DQogIGlkICAgICAgICAgICAgICAgIEludCAgICAgICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpDQogIHVzZXJJZCAgICAgICAgICAgIEludCAgICAgICAgIC8vIExpbmsgdG8gdGhlIFVzZXIgSUQgaW4gdGhlIGF1dGhlbnRpY2F0aW9uIHNlcnZpY2UNCiAgYmlvICAgICAgICAgICAgU3RyaW5nPw0KICBwcm9maWxlUGljdHVyZSBTdHJpbmc/DQogIGNyZWF0ZWRBdCAgICAgIERhdGVUaW1lICAgICAgIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgICAgICBEYXRlVGltZSAgICAgICBAdXBkYXRlZEF0DQogIG1lbnVzICAgICAgICAgICAgIE1lbnVbXSBAcmVsYXRpb24oIkNoZWZUb01lbnUiKQ0KICBzY2hlZHVsZXMgICAgICAgICBDaGVmU2NoZWR1bGVbXSBAcmVsYXRpb24oIkNoZWZUb0NoZWZTY2hlZHVsZSIpDQogIC8vIC4uLiBvdGhlciBmaWVsZHMgc3BlY2lmaWMgdG8gdGhlIGNoZWYgLi4uDQp9DQoNCm1vZGVsIE1lbnUgew0KICBpZCAgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICBAaWQgQGRlZmF1bHQodXVpZCgpKQ0KICBzdG9yZUlkICAgICAgICAgICBTdHJpbmcNCiAgc3RvcmUgICAgICAgICAgICAgU3RvcmUgICAgICAgICAgICAgIEByZWxhdGlvbigiU3RvcmVUb01lbnUiLGZpZWxkczogW3N0b3JlSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBuYW1lICAgICAgICAgICAgICBTdHJpbmcNCiAgY2hlZklkICAgICAgICAgICAgSW50DQogIGNoZWYgICAgICAgICAgICAgIENoZWYgICAgICAgIEByZWxhdGlvbigiQ2hlZlRvTWVudSIsZmllbGRzOiBbY2hlZklkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgb3JkZXJJdGVtcyAgICAgICAgT3JkZXJJdGVtW10gICBAcmVsYXRpb24oIk1lbnVUb09yZGVySXRlbSIpDQogIGNhdGVnb3J5SWQgICAgICAgIFN0cmluZyAgICAgICAgICAgIC8vIEZvcmVpZ24gS2V5IHRvIENhdGVnb3J5DQogIGltYWdlcyAgICAgICAgICAgIEltYWdlW10NCiAgc2l6ZUlkICAgICAgU3RyaW5nICAgIC8vIEZvcmVpZ24gS2V5IHRvIFNpemUNCiAgc2l6ZSAgICAgICAgU2l6ZSAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtzaXplSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBjYXRlZ29yeSAgICAgICAgICBDYXRlZ29yeSAgICAgIEByZWxhdGlvbigiQ2F0ZWdvcnlUb01lbnUiLGZpZWxkczogW2NhdGVnb3J5SWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICB0aXRsZSAgICAgICAgICAgICBTdHJpbmc/DQogIGRlc2NyaXB0aW9uICAgICAgIFN0cmluZz8NCiAgcGlja3VwRGF0ZSAgICAgICAgRGF0ZVRpbWU/ICAgLy8gV2hlbiB0aGUgY3VzdG9tZXIgcGxhbnMgdG8gcGljayB1cCB0aGUgb3JkZXINCiAgcHJpY2UgICAgICAgICAgICAgRGVjaW1hbA0KICBpc0ZlYXR1cmVkICBCb29sZWFuICAgQGRlZmF1bHQoZmFsc2UpDQogIGlzQXJjaGl2ZWQgIEJvb2xlYW4gICBAZGVmYXVsdChmYWxzZSkNCiAgYXZhaWxhYmxlRGF0ZXMgICAgQ2hlZlNjaGVkdWxlW10gQHJlbGF0aW9uKCJNZW51VG9DaGVmU2NoZWR1bGUiKQ0KICBjcmVhdGVkQXQgICAgICBEYXRlVGltZSAgICAgICAgQGRlZmF1bHQobm93KCkpDQogIHVwZGF0ZWRBdCAgICAgIERhdGVUaW1lICAgICAgICBAdXBkYXRlZEF0DQoNCiAgQEBpbmRleChbc3RvcmVJZF0pDQogIEBAaW5kZXgoW2NoZWZJZF0pDQogIEBAaW5kZXgoW2NhdGVnb3J5SWRdKQ0KICBAQGluZGV4KFtzaXplSWRdKQ0KICAvLyAuLi4gb3RoZXIgZmllbGRzIC4uLg0KfQ0KDQptb2RlbCBDaGVmU2NoZWR1bGUgew0KICBpZCAgICAgICAgICAgICAgICBJbnQgICAgICAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKQ0KICBtZW51SWQgICAgICAgICAgICBTdHJpbmcNCiAgY2hlZklkICAgICAgICAgICAgSW50DQogIGNoZWYgICAgICAgICAgICAgIENoZWYgICAgICAgIEByZWxhdGlvbigiQ2hlZlRvQ2hlZlNjaGVkdWxlIixmaWVsZHM6IFtjaGVmSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBtZW51ICAgICAgICAgICAgICBNZW51ICAgICAgICBAcmVsYXRpb24oIk1lbnVUb0NoZWZTY2hlZHVsZSIsZmllbGRzOiBbbWVudUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgZGF0ZSAgICAgICAgICAgICAgRGF0ZVRpbWUgICAgDQogIEBAaW5kZXgoW2NoZWZJZF0pDQogIEBAaW5kZXgoW21lbnVJZF0pDQp9DQoNCm1vZGVsIE9yZGVyIHsNCiAgaWQgICAgICAgICAgICAgICAgU3RyaW5nICAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpDQogIGN1c3RvbWVySWQgICAgICAgIFN0cmluZyAgICAgICAgIC8vIExpbmsgdG8gdGhlIFVzZXIgSUQgaW4gdGhlIGF1dGhlbnRpY2F0aW9uIHNlcnZpY2UNCiAgb3JkZXJJdGVtcyAgICAgICAgT3JkZXJJdGVtW10gLy8gUmVsYXRpb24gdG8gT3JkZXJJdGVtIG1vZGVsDQogIHN0YXR1cyAgICAgICAgICAgIE9yZGVyU3RhdHVzDQogIGlzUGFpZCAgICAgQm9vbGVhbiAgIEBkZWZhdWx0KGZhbHNlKQ0KICBwaG9uZSAgICAgIFN0cmluZyAgICBAZGVmYXVsdCgiIikNCiAgYWRkcmVzcyAgICBTdHJpbmcgICAgQGRlZmF1bHQoIiIpDQogIG9yZGVyRGF0ZSAgICAgICAgIERhdGVUaW1lICAgIEBkZWZhdWx0KG5vdygpKQ0KICB0b3RhbEFtb3VudCBGbG9hdCAgICAgICAvLyBDYWxjdWxhdGVkIHRvdGFsIGNvc3Qgb2YgdGhlIG9yZGVyDQogIG5vdGVzICAgICAgIFN0cmluZz8gICAgIC8vIFNwZWNpYWwgaW5zdHJ1Y3Rpb25zIG9yIHJlcXVlc3RzDQogIHN0b3JlSWQgICAgU3RyaW5nDQogIHN0b3JlICAgICAgU3RvcmUgICAgQHJlbGF0aW9uKCJTdG9yZVRvT3JkZXIiLGZpZWxkczogW3N0b3JlSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBjcmVhdGVkQXQgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKQ0KICB1cGRhdGVkQXQgRGF0ZVRpbWUgIEB1cGRhdGVkQXQNCiAgQEBpbmRleChbc3RvcmVJZF0pDQogIC8vIC4uLiBvdGhlciBmaWVsZHMgLi4uDQp9DQoNCm1vZGVsIE9yZGVySXRlbSB7DQogIGlkICAgICAgICAgICAgICAgIEludCAgICAgICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpDQogIG9yZGVySWQgICAgICAgICAgIFN0cmluZw0KICBvcmRlciAgICAgICAgICAgICBPcmRlciAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbb3JkZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0pDQogIG1lbnVJZCAgICAgICAgICAgIFN0cmluZw0KICBtZW51ICAgICAgICAgICAgICBNZW51ICAgICAgICBAcmVsYXRpb24oIk1lbnVUb09yZGVySXRlbSIsZmllbGRzOiBbbWVudUlkXSwgcmVmZXJlbmNlczogW2lkXSkNCiAgcXVhbnRpdHkgICAgICAgICAgSW50Pw0KICB1bml0UHJpY2UgIEZsb2F0ICAgLy8gUHJpY2Ugb2YgdGhlIGl0ZW0gYXQgdGhlIHRpbWUgb2Ygb3JkZXINCiAgQEBpbmRleChbb3JkZXJJZF0pDQogIEBAaW5kZXgoW21lbnVJZF0pDQogIA0KICAvLyAuLi4gb3RoZXIgZmllbGRzIC4uLg0KfQ0KDQptb2RlbCBTaXplIHsNCiAgaWQgICAgICAgICAgU3RyaW5nICAgIEBpZCBAZGVmYXVsdCh1dWlkKCkpDQogIHN0b3JlSWQgICAgIFN0cmluZyAgICAvLyBGb3JlaWduIEtleSB0byBTdG9yZQ0KICBzdG9yZSAgICAgICBTdG9yZSAgICAgQHJlbGF0aW9uKCJTdG9yZVRvU2l6ZSIsIGZpZWxkczogW3N0b3JlSWRdLCByZWZlcmVuY2VzOiBbaWRdKQ0KICBuYW1lICAgICAgICBTdHJpbmcNCiAgcXVhbnRpdHkgICAgU3RyaW5nDQogIG1lbnVzICAgICAgIE1lbnVbXSAgICAvLyBSZWxhdGlvbiB0byBQcm9kdWN0IG1vZGVsDQogIGNyZWF0ZWRBdCAgIERhdGVUaW1lICBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlZEF0ICAgRGF0ZVRpbWUgIEB1cGRhdGVkQXQNCg0KICBAQGluZGV4KFtzdG9yZUlkXSkNCn0NCg0KbW9kZWwgSW1hZ2Ugew0KICBpZCAgICAgICAgICBTdHJpbmcgICBAaWQgQGRlZmF1bHQodXVpZCgpKQ0KICBtZW51SWQgICAgICBTdHJpbmcgICAvLyBGb3JlaWduIEtleSB0byBQcm9kdWN0DQogIG1lbnUgICAgICAgIE1lbnUgICAgIEByZWxhdGlvbihmaWVsZHM6IFttZW51SWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkNCiAgdXJsICAgICAgICAgU3RyaW5nICAgLy8gVVJMIG9mIHRoZSBpbWFnZQ0KICBjcmVhdGVkQXQgICBEYXRlVGltZSBAZGVmYXVsdChub3coKSkNCiAgdXBkYXRlZEF0ICAgRGF0ZVRpbWUgQHVwZGF0ZWRBdA0KDQogIEBAaW5kZXgoW21lbnVJZF0pDQp9DQoNCg0KZW51bSBPcmRlclN0YXR1cyB7DQogIFBMQUNFRA0KICBQQUlEDQogIENBTkNFTExFRA0KICBDT01QTEVURUQNCn0NCmVudW0gU3RvcmVTdGF0dXMgew0KICBBQ1RJVkUNCiAgSU5BQ1RJVkUNCn0NCg==",
  "inlineSchemaHash": "9ad3354c003b68567132278078b45abd09bf76e9fe016739c3ac52285f869585"
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Store\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"StoreStatus\",\"default\":\"ACTIVE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"StoreToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billboards\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Billboard\",\"relationName\":\"StoreToBillboard\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categories\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"StoreToCategory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"StoreToOrder\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sizes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Size\",\"relationName\":\"StoreToSize\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updateAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Billboard\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"StoreToBillboard\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"label\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categories\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"BillboardToCategory\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Category\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"StoreToCategory\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billboardId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"billboard\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Billboard\",\"relationName\":\"BillboardToCategory\",\"relationFromFields\":[\"billboardId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"CategoryToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Chef\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"bio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"profilePicture\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"ChefToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"schedules\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChefSchedule\",\"relationName\":\"ChefToChefSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Menu\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"StoreToMenu\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chefId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chef\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chef\",\"relationName\":\"ChefToMenu\",\"relationFromFields\":[\"chefId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderItem\",\"relationName\":\"MenuToOrderItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"categoryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"images\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Image\",\"relationName\":\"ImageToMenu\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sizeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"size\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Size\",\"relationName\":\"MenuToSize\",\"relationFromFields\":[\"sizeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"category\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Category\",\"relationName\":\"CategoryToMenu\",\"relationFromFields\":[\"categoryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"title\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"price\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isFeatured\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isArchived\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"availableDates\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChefSchedule\",\"relationName\":\"MenuToChefSchedule\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChefSchedule\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menuId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chefId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"chef\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Chef\",\"relationName\":\"ChefToChefSchedule\",\"relationFromFields\":[\"chefId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToChefSchedule\",\"relationFromFields\":[\"menuId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"date\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Order\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderItem\",\"relationName\":\"OrderToOrderItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"OrderStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"isPaid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phone\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"address\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalAmount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"notes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"StoreToOrder\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"OrderItem\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Order\",\"relationName\":\"OrderToOrderItem\",\"relationFromFields\":[\"orderId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menuId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToOrderItem\",\"relationFromFields\":[\"menuId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"unitPrice\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Size\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"storeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"store\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Store\",\"relationName\":\"StoreToSize\",\"relationFromFields\":[\"storeId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menus\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"MenuToSize\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Image\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menuId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"menu\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Menu\",\"relationName\":\"ImageToMenu\",\"relationFromFields\":[\"menuId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"OrderStatus\":{\"values\":[{\"name\":\"PLACED\",\"dbName\":null},{\"name\":\"PAID\",\"dbName\":null},{\"name\":\"CANCELLED\",\"dbName\":null},{\"name\":\"COMPLETED\",\"dbName\":null}],\"dbName\":null},\"StoreStatus\":{\"values\":[{\"name\":\"ACTIVE\",\"dbName\":null},{\"name\":\"INACTIVE\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    MYSQL_DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['MYSQL_DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.MYSQL_DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)


// Broadcast Atelier direction: the data model keeps Kasha's editorial system flexible without losing clear hierarchy between signals, stories, and published artefacts.
import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const siteSettings = mysqlTable("site_settings", {
  id: int("id").primaryKey(),
  siteName: varchar("siteName", { length: 160 }).notNull(),
  brandLine: varchar("brandLine", { length: 160 }).notNull(),
  heroEyebrow: varchar("heroEyebrow", { length: 220 }).notNull(),
  heroTitle: varchar("heroTitle", { length: 240 }).notNull(),
  heroAccent: varchar("heroAccent", { length: 240 }).notNull(),
  heroIntro: text("heroIntro").notNull(),
  heroCtaLabel: varchar("heroCtaLabel", { length: 120 }).notNull(),
  heroImageUrl: text("heroImageUrl").notNull(),
  heroAsideTitle: varchar("heroAsideTitle", { length: 240 }).notNull(),
  heroAsideBody: text("heroAsideBody").notNull(),
  heroFooterIndex: varchar("heroFooterIndex", { length: 80 }).default("01 / 06").notNull(),
  heroFooterDescriptor: varchar("heroFooterDescriptor", { length: 240 }).default("Radio + online media + event promotion").notNull(),
  tickerItems: text("tickerItems").notNull(),
  aboutEyebrow: varchar("aboutEyebrow", { length: 220 }).notNull(),
  aboutRailLabel: varchar("aboutRailLabel", { length: 160 }).default("About the signal").notNull(),
  aboutTitle: varchar("aboutTitle", { length: 240 }).notNull(),
  aboutAccent: varchar("aboutAccent", { length: 240 }).notNull(),
  aboutBody: text("aboutBody").notNull(),
  aboutQuote: text("aboutQuote").notNull(),
  aboutImageUrl: text("aboutImageUrl").notNull(),
  aboutCaptionLeft: varchar("aboutCaptionLeft", { length: 240 }).default("Field recording / Addis Ababa").notNull(),
  aboutCaptionRight: varchar("aboutCaptionRight", { length: 240 }).default("03° 28' N / 38° 44' E").notNull(),
  programsEyebrow: varchar("programsEyebrow", { length: 220 }).notNull(),
  programsRailLabel: varchar("programsRailLabel", { length: 160 }).default("Programmes").notNull(),
  programsTitle: varchar("programsTitle", { length: 240 }).notNull(),
  programsAccent: varchar("programsAccent", { length: 240 }).notNull(),
  programsSummary: text("programsSummary").notNull(),
  audioImageLabel: varchar("audioImageLabel", { length: 160 }).default("Listen / 00:48").notNull(),
  audioCaptionLabel: varchar("audioCaptionLabel", { length: 160 }).default("Latest signal").notNull(),
  servicesEyebrow: varchar("servicesEyebrow", { length: 220 }).notNull(),
  servicesRailLabel: varchar("servicesRailLabel", { length: 160 }).default("What we make").notNull(),
  servicesTitle: varchar("servicesTitle", { length: 240 }).notNull(),
  servicesAccent: varchar("servicesAccent", { length: 240 }).notNull(),
  servicesSummary: text("servicesSummary").notNull(),
  eventEyebrow: varchar("eventEyebrow", { length: 220 }).notNull(),
  eventTitle: varchar("eventTitle", { length: 240 }).notNull(),
  eventAccent: varchar("eventAccent", { length: 240 }).notNull(),
  eventBody: text("eventBody").notNull(),
  eventCtaLabel: varchar("eventCtaLabel", { length: 120 }).notNull(),
  eventImageUrl: text("eventImageUrl").notNull(),
  eventImageLabel: varchar("eventImageLabel", { length: 200 }).default("Event promotion / Open room").notNull(),
  journalEyebrow: varchar("journalEyebrow", { length: 220 }).notNull(),
  journalRailLabel: varchar("journalRailLabel", { length: 160 }).default("Journal / field notes").notNull(),
  journalTitle: varchar("journalTitle", { length: 240 }).notNull(),
  journalAccent: varchar("journalAccent", { length: 240 }).notNull(),
  contactEyebrow: varchar("contactEyebrow", { length: 220 }).notNull(),
  contactRailLabel: varchar("contactRailLabel", { length: 160 }).default("Start a conversation").notNull(),
  contactTitle: varchar("contactTitle", { length: 240 }).notNull(),
  contactAccent: varchar("contactAccent", { length: 240 }).notNull(),
  contactBody: text("contactBody").notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactLocation: varchar("contactLocation", { length: 320 }).notNull(),
  instagramUrl: text("instagramUrl").notNull(),
  youtubeUrl: text("youtubeUrl").notNull(),
  facebookUrl: text("facebookUrl").notNull(),
  footerNavigateLabel: varchar("footerNavigateLabel", { length: 120 }).default("Navigate").notNull(),
  footerFollowLabel: varchar("footerFollowLabel", { length: 160 }).default("Follow the signal").notNull(),
  footerBuiltLine: varchar("footerBuiltLine", { length: 240 }).default("Built in Addis Ababa / Made to travel").notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

const contentTimestamps = {
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
};

export const programs = mysqlTable("programs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  subtitle: varchar("subtitle", { length: 180 }).notNull(),
  description: text("description").notNull(),
  tag: varchar("tag", { length: 120 }).notNull(),
  imageUrl: text("imageUrl"),
  featureTitle: varchar("featureTitle", { length: 240 }),
  featureSubtitle: varchar("featureSubtitle", { length: 240 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  ...contentTimestamps,
});

export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description").notNull(),
  iconKey: varchar("iconKey", { length: 64 }).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  ...contentTimestamps,
});

export const events = mysqlTable("events", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 220 }).notNull(),
  description: text("description").notNull(),
  imageUrl: text("imageUrl").notNull(),
  ctaLabel: varchar("ctaLabel", { length: 120 }).notNull(),
  ctaTarget: varchar("ctaTarget", { length: 240 }).notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  ...contentTimestamps,
});

export const journalEntries = mysqlTable("journal_entries", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 260 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  dateLabel: varchar("dateLabel", { length: 120 }).notNull(),
  body: text("body"),
  sortOrder: int("sortOrder").default(0).notNull(),
  isPublished: boolean("isPublished").default(true).notNull(),
  ...contentTimestamps,
});

export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  storageKey: text("storageKey").notNull(),
  url: text("url").notNull(),
  altText: varchar("altText", { length: 320 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const inquiries = mysqlTable("inquiries", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 180 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  brief: text("brief").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied", "archived"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

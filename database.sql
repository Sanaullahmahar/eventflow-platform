-- ============================================================
-- EventFlow Insurance Quotes Database Schema
-- Run this in phpMyAdmin or MySQL CLI with XAMPP running
-- ============================================================

-- 1. Create the database (if it doesn't exist yet)
CREATE DATABASE IF NOT EXISTS events_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE events_db;

-- 2. Create the insurance_quotes table
CREATE TABLE IF NOT EXISTS insurance_quotes (
  id                            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

  -- Event details
  event_type                    VARCHAR(100)    DEFAULT NULL,
  event_type_other              VARCHAR(255)    DEFAULT NULL,
  event_timing_type             VARCHAR(50)     DEFAULT NULL,
  event_date                    DATE            DEFAULT NULL,
  event_end_date                DATE            DEFAULT NULL,
  event_state                   VARCHAR(50)     DEFAULT NULL,
  is_private_residence          TINYINT(1)      DEFAULT 0,
  alcohol_type                  VARCHAR(50)     DEFAULT NULL,
  profit_from_alcohol           TINYINT(1)      DEFAULT NULL,
  ticketed_event                TINYINT(1)      DEFAULT NULL,
  guest_count                   INT UNSIGNED    DEFAULT NULL,
  has_activities                TINYINT(1)      DEFAULT 0,
  activities                    JSON            DEFAULT NULL,   -- stored as JSON array

  -- Venue requirements
  venue_requires_additional_insured TINYINT(1)  DEFAULT 0,
  waiver_of_subrogation         TINYINT(1)      DEFAULT 0,
  primary_non_contributory      TINYINT(1)      DEFAULT 0,
  hired_non_owned_auto          TINYINT(1)      DEFAULT 0,
  additional_insured_amount     DECIMAL(10,2)   DEFAULT 0.00,

  -- Event info
  event_name                    VARCHAR(255)    DEFAULT NULL,
  event_description             TEXT            DEFAULT NULL,
  selected_plan                 VARCHAR(100)    DEFAULT NULL,

  -- Insured person
  insured_first_name            VARCHAR(100)    DEFAULT NULL,
  insured_last_name             VARCHAR(100)    DEFAULT NULL,
  insured_address               VARCHAR(255)    DEFAULT NULL,
  insured_city                  VARCHAR(100)    DEFAULT NULL,
  insured_state                 VARCHAR(50)     DEFAULT NULL,
  insured_zip                   VARCHAR(20)     DEFAULT NULL,

  -- Venue
  venue_name                    VARCHAR(255)    DEFAULT NULL,
  venue_address                 VARCHAR(255)    DEFAULT NULL,
  venue_city                    VARCHAR(100)    DEFAULT NULL,
  venue_state                   VARCHAR(50)     DEFAULT NULL,
  venue_zip                     VARCHAR(20)     DEFAULT NULL,
  venue_contact_name            VARCHAR(255)    DEFAULT NULL,
  venue_contact_phone           VARCHAR(50)     DEFAULT NULL,
  venue_contact_email           VARCHAR(255)    DEFAULT NULL,

  -- Quote requester
  quote_user_first_name         VARCHAR(100)    DEFAULT NULL,
  quote_user_last_name          VARCHAR(100)    DEFAULT NULL,
  quote_user_email              VARCHAR(255)    DEFAULT NULL,
  quote_user_phone_number       VARCHAR(50)     DEFAULT NULL,

  -- Timestamps
  created_at                    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---
name: generate-sample-data
description: Use when you need to generate scripts that generate sample data, including for demos, business scenarios, analytics, machine learning, or performance/cost experiments.
license: Apache-2.0
metadata:
  version: v1
  publisher: Lucia Subatin
---

# Generating Sample Data

Generates scripts to create sample data tailored to various scenarios, from simple demos to large-scale performance testing. It ensures the generated data matches the target platform's syntax, incorporates real-world complexity where needed, and includes data quality assertions.

## When to Use
- You are asked to create scripts to generate sample data.
- The user needs mock data for testing or demonstration.
- Scenarios range from simple SQL snippets to complex, multi-table business data or high-volume datasets for performance testing.

## Target Platform & Syntax
**CRITICAL:** Always ask the user for the **target platform** (e.g., PostgreSQL, BigQuery, MySQL, Spark, etc.) before generating data scripts.
- The generated syntax MUST match the target platform exactly.
- Assume you do not have the latest syntax. Use a Google Search to verify the correct syntax for the target platform.

## Data Generation Scenarios

Evaluate the user's request against the following five scenarios and generate data accordingly:

### 1. Quick Demo Data
- **Goal:** Demonstrate a very specific scenario, like a single SQL function or a feature applying to a single column.
- **Approach:** Generate a concise, self-contained script (e.g., a simple `CREATE TABLE` and a few `INSERT` statements, or a `SELECT` with hardcoded `UNION ALL` values). Keep it minimal.

### 2. Real-Life Business Data
- **Goal:** Mimic a line-of-business scenario (e.g., finance, procurement, e-commerce).
- **Approach:**
  - Create multiple tables (e.g., Customers, Orders, OrderItems, Products).
  - Enforce **referential integrity** (foreign keys where applicable).
  - Include real-life aspects: multiple currencies, different languages, units of measure, tax calculations, and realistic distributions (e.g., Pareto principle for sales).
  - If long text columns are required (such as customer feedback, complaints, reviews, comments, etc.), use a few sentences instead of random strings to make the data more realistic.
  - If short text (like product descriptions) and long texts are required, inquire about using multiple languages.
  - Inquire if the text and examples need to be different for every record.
  - If names or emails are required, DO NOT use real data. Create random names and email addresses.
  - If addresses are required, use realistic street names, cities, and states. Inquire about using real addresses. If needed, use Google Maps to generate realistic addresses.

### 3. Data for Analytics
- **Goal:** Support analytical queries, dashboards, and reporting.
- **Approach:**
  - Include all elements from "Real-Life Business Data".
  - Add common analytical dimensions like **Time/Date dimensions** (Date, Month, Quarter, Year, Day of Week) and **Geographical dimensions** (Country, State, City, Zip).
  - Consider adding unstructured or semi-structured data (e.g., JSON columns for events, metadata, or multimedia references).
  - If long text columns are required (such as complaints or reviews), use a few sentences instead of random strings to make the data more realistic.
  - Inquire if the text and examples need to be different for every record.

### 4. Data for Statistics or Machine Learning
- **Goal:** Provide data suitable for training algorithms, statistical testing, or modeling.
- **Approach:**
  - Consider the target algorithm and desired end result (e.g., classification, regression, clustering).
  - Ensure data repetitions, correlations, and anomalies make statistical sense.
  - Ask the user if a **long-running data generator** (e.g., a Python script using `Faker` or `scikit-learn` dataset generators that runs continuously) makes sense for their use case.
  - If a long-running job is required, provide the scripts to both **generate** the infrastructure/data and **tear down** the infrastructure afterward to prevent unintended costs.

### 5. Data for Performance or Cost Experiments
- **Goal:** Understand platform features at scale and generate high-volume data.
- **Approach:**
  - Focus on understanding the underlying features of the target platform first.
  - Generate data at scale.
  - Consider and implement data partitions, clustering, or other potential optimizations for the specific platform.
  - Consider large volume streaming requirements.
  - Consider if time series data is needed.
  - If long text columns are required (such as complaints or reviews), use a few sentences instead of random strings to make the data more realistic.
  - Inquire if the text and examples need to be different for every record.
  - If a long-running job is required, provide the scripts to both **generate** the infrastructure/data and **tear down** the infrastructure afterward to prevent unintended costs.

## Mandatory Requirements

1. **Data Quality Assertions:**
   - ALWAYS generate data quality assertions alongside the sample data scripts.
   - Examples include: scripts to test for null values in non-null columns, uniqueness checks for primary keys, or referential integrity validations.

2. **BigQuery Handoff:**
   - If the target platform is **BigQuery**, you MUST engage the Data Engineering Agent. Do not write the BigQuery scripts yourself; coordinate with the Data Engineering Agent to handle the generation.

3. **Configurable Variables and Data:**
   - The scripts should be **configurable** to allow the user to change the number of records, the location of the data, and other relevant parameters.
   - The Project ID, location, dataset, etc. should be parameters. DDL and DML statements should have placeholders for these parameters.
   - If using an AI model to generate data, ask the user which version should be used, unless it is clearly specified in the prompt.
   - If generating data from random values picked from a list, use text files as sources so the user can easily modify the values.
   - The duration of the data or number of records should be configurable.

4. **Programming Languages:**
   - Use Python to generate the actual data. Use Python 3.14 and `uv` as a package manager and to create virtual environments to execute the scripts.
   - Use SQL for DDL and DML.
   - Use bash for infrastructure setup and executing the scripts.
   - Inquire about the preferred output (CSV, TSV, INSERT statements).

5. **Scripts:**
   - The scripts to create datasets, tables, and fill them with data should be idempotent.
   - The scripts should set the configuration for the `gcloud` CLI to match the parameters.
   - The scripts or instructions should consider running in the background or as a Managed Spark job if the volume is more than 1,000,000 records.
   - Data generation scripts should write into files like CSV as data is generated.

## Process Flow

1. Identify the requested scenario among the 5 categories.
2. If the target platform is not specified, ASK the user.
3. If BigQuery -> Engage Data Engineering Agent.
4. Interview the user relentlessly about every aspect of this until you reach a shared understanding. Walk down each aspect of the schema (tables, fields, keys). For each question, provide your recommended answer.
5. Generate the DDL and DML scripts tailored to the scenario and platform.
6. Generate a Python script to fill the tables with data.
7. Generate a bash script to run all the DDL, DML, and Python scripts at once and in the right sequence.
8. If scenario 4 or 5 apply, inquire about long-running generators or provide tear-down scripts.
9. Generate Data Quality Assertions.
10. Generate a script to delete the generated artifacts and infrastructure.
11. Provide a `README.md` file with clear steps and commands on how to run the scripts and test the data.

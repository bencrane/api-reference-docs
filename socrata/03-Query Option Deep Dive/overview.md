# Query Option Deep Dive

## The `query` Option

SoQL statements are broken into clauses similar to SQL statements. If a clause is not specified, then the default is used.

In this page, we will be using the "My super awesome Earthquakes" dataset as an example.

---

## SELECT

A SoQL statement must have a `SELECT` clause; the most basic selects `*` which, in SoQL, means "all user columns":

```sql
SELECT *
```

You may also specify a specific subset of columns. When referring to a column, it is best practice to surround it with backticks.

```sql
SELECT `earthquake_id`, `magnitude`, `depth`
```

You may also rename a selected field with the `AS` keyword.

```sql
SELECT `magnitude` AS `strength`
```

---

## FROM

If you're used to SQL, you may have expected a `FROM` clause; in SoQL, this is atypical, because queries occur in the context of a view, which already identifies the data source.

---

## WHERE

The `WHERE` parameter allows you to filter your results using boolean operators. For example, to retrieve only quakes with a `magnitude` of greater than 3.0:

```sql
SELECT * WHERE `magnitude` > 3.0
```

Multiple conditions can be added using `AND` or `OR`.

| Operator | Description | Example |
|---|---|---|
| `AND` | The logical **and** of two expressions. | `a AND b` will return true ONLY if `a` and `b` are both true. |
| `OR` | The logical **or** of two expressions. | `a OR b` will return true if either `a` or `b` are true. |
| `NOT` | The logical **not** of an expression. | `NOT a` will return true, ONLY if `a` is false. |
| `IS NULL` | Whether a value is null or not. | `a IS NULL` will return true, ONLY if `a` is null. |
| `IS NOT NULL` | Whether a value is not null. | `a IS NOT NULL` will return true, ONLY if `a` is not null. |
| `( ... )` | Parentheses are used for defining order of operations. | `b > 3 AND (a = 1 OR a = 2)` |

For example:

```sql
SELECT * WHERE `magnitude` > 3.0 AND `source` = 'pr'
```

---

## GROUP BY and HAVING

SoQL also provides a limited amount of aggregation functionality through its `GROUP BY` clause. `GROUP BY` must be used in conjunction with `SELECT` to provide the aggregation functions you wish to use. For example, to find the strongest earthquake by region:

```sql
SELECT `region`, max(`magnitude`) GROUP BY `region`
```

### Grouping Expressions

| Function | Datatypes Supported | Description |
|---|---|---|
| `sum` | Number | Sums up all the values in a grouping |
| `count` | All | Counts the number of values. `null` values are not counted |
| `avg` | Number | Finds the average value of numbers in this column |
| `min` | Number | Finds the minimum value of numbers in this column |
| `max` | Number | Finds the maximum value of numbers in this column |

The `HAVING` clause allows you to filter your results of an aggregation using boolean operators. For example, to aggregate earthquakes and get only the sources with more than 500 quakes:

```sql
SELECT `source`, count(*) as `count` GROUP BY `source` HAVING `count` > 500
```

---

## ORDER BY

The `ORDER BY` clause determines how the results should be sorted, using the values from the specified columns. Sorting can be performed in either ascending or descending order, the default being ascending, but you can also reverse the order with `DESC`.

```sql
SELECT * ORDER BY `magnitude` DESC
```

---

## LIMIT and OFFSET

It is also possible to manually set the `LIMIT` and `OFFSET` clauses, which accept an integer. However, this is not recommended and you should prefer to use the `page` parameter.

---

## Additional Notes

Just as in SQL, whitespace outside of string literals will be ignored, so you can format your SoQL query however you wish. You may also encode comments with most styles: end-of-line `--` or `//` or block-level `/*` and `*/` — but there are no guarantees that your comments will be preserved.
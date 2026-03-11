# SoQL Function Reference

## SoQL Function and Keyword Listing

The following are all the functions and keywords available in SoQL. Some only work on the latest version of our API endpoints, while some work on legacy versions as well.

For a list of valid operators, see the Datatypes documentation.

---

## Keywords

| Keyword Name | Description | Availability |
|---|---|---|
| `distinct` | Returns distinct set of records | 2.1 and 3.0 |

---

## Functions

| Function Name | Description | Availability |
|---|---|---|
| `avg(...)` | Returns the average of a given set of numbers | 2.0, 2.1, and 3.0 |
| `between ... and ...` | Returns TRUE for values in a given range | 2.1 and 3.0 |
| `case(...)` | Returns different values based on the evaluation of boolean comparisons | 2.1 and 3.0 |
| `convex_hull(...)` | Returns the minimum convex geometry that encloses all of another geometry | 2.1 and 3.0 |
| `count(...)` | Returns a count of a given set of records | 2.0, 2.1, and 3.0 |
| `date_extract_d(...)` | Extracts the day from the date as an integer | 2.1 and 3.0 |
| `date_extract_dow(...)` | Extracts the day of the week as an integer between 0 and 6 (inclusive) | 2.1 and 3.0 |
| `date_extract_hh(...)` | Extracts the hour of the day as an integer between 0 and 23 (inclusive) | 2.1 and 3.0 |
| `date_extract_m(...)` | Extracts the month as an integer | 2.1 and 3.0 |
| `date_extract_mm(...)` | Extracts the minute from the time as an integer | 2.1 and 3.0 |
| `date_extract_ss(...)` | Extracts the second from the time as an integer | 2.1 and 3.0 |
| `date_extract_woy(...)` | Extracts the week of the year as an integer between 0 and 51 (inclusive) | 2.1 and 3.0 |
| `date_extract_y(...)` | Extracts the year as an integer | 2.1 and 3.0 |
| `date_trunc_y(...)` | Truncates a calendar date at the year threshold | 2.0, 2.1, and 3.0 |
| `date_trunc_ym(...)` | Truncates a calendar date at the year/month threshold | 2.0, 2.1, and 3.0 |
| `date_trunc_ymd(...)` | Truncates a calendar date at the year/month/date threshold | 2.0, 2.1, and 3.0 |
| `distance_in_meters(...)` | Returns the distance between two Points in meters | 2.1 and 3.0 |
| `extent(...)` | Returns a bounding box that encloses a set of geometries | 2.1 and 3.0 |
| `greatest(...)` | Returns the largest value among its arguments, ignoring NULLs | 2.1 and 3.0 |
| `in(...)` | Matches values in a given set of options | 2.1 and 3.0 |
| `intersects(...)` | Allows you to compare two geospatial types to see if they intersect or overlap each other | 2.1 and 3.0 |
| `least(...)` | Returns the smallest value among its arguments, ignoring NULLs | 2.1 and 3.0 |
| `like '...'` | Allows for substring searches in text strings | 2.1 and 3.0 |
| `ln(...)` | Returns the natural log of a number | 2.1 and 3.0 |
| `lower(...)` | Returns the lowercase equivalent of a string of text | 2.1 and 3.0 |
| `max(...)` | Returns the maximum of a given set of numbers | 2.1 and 3.0 |
| `min(...)` | Returns the minimum of a given set of numbers | 2.1 and 3.0 |
| `not between ... and ...` | Returns TRUE for values not in a given range | 2.1 and 3.0 |
| `not in(...)` | Matches values not in a given set of options | 2.1 and 3.0 |
| `not like '...'` | Allows for matching text fields that do not contain a substring | 2.1 and 3.0 |
| `num_points(...)` | Returns the number of vertices in a geospatial data record | 2.1 and 3.0 |
| `regr_intercept(...)` | Returns the y-intercept of the linear least squares fit | 2.1 and 3.0 |
| `regr_r2(...)` | Returns the square of the correlation coefficient (r²) | 2.1 and 3.0 |
| `regr_slope(...)` | Returns the slope of the linear least squares fit | 2.1 and 3.0 |
| `simplify(...)` | Reduces the number of vertices in a line or polygon | 2.1 and 3.0 |
| `simplify_preserve_topology(...)` | Reduces the number of vertices in a line or polygon, preserving topology | 2.1 and 3.0 |
| `starts_with(...)` | Matches on text strings that start with a given substring | 2.1 and 3.0 |
| `stddev_pop(...)` | Returns the population standard deviation of a given set of numbers | 2.1 and 3.0 |
| `stddev_samp(...)` | Returns a sampled standard deviation of a given set of numbers | 2.1 and 3.0 |
| `sum(...)` | Returns the sum of a given set of numbers | 2.1 and 3.0 |
| `unaccent(...)` | Removes accents (diacritical marks) from a string | 2.1 and 3.0 |
| `upper(...)` | Returns the uppercase equivalent of a string of text | 2.1 and 3.0 |
| `within_box(...)` | Returns the rows that have geodata within the specified box, defined by latitude, longitude corners | 2.0, 2.1, and 3.0 |
| `within_circle(...)` | Returns the rows that have locations within a specified circle, measured in meters | 2.0, 2.1, and 3.0 |
| `within_polygon(...)` | Returns the rows that have locations within the specified box, defined by latitude, longitude corners | — |
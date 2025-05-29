# Test Cases for `calculateCarValue` Function

| Test Case Number | Input (model, year)                    | Expected Output ($ value)          | Test Description                              |
|------------------|--------------------------------------|----------------------------------|----------------------------------------------|
| 1                | Civic, 2020                          | 6620                             | Happy path - standard model and year         |
| 2                | Model T, 1908                       | 8808                             | Handles spaces in model name                  |
| 3                | RX-8, 2010                         | 6210                             | Handles special characters in model          |
| 4                | Corolla, -1999                     | Error: "A Year must be a positive integer." | Negative year input validation                |
| 5                | Accord, "TwoThousand"              | Error: "A Year must be a positive integer." | Non-numeric year input validation             |
| 6                | "", 2020                          | Error: "Please enter a model and year." | Empty model name validation                    |
| 7                | A, 2020                          | 2120                             | Single character model "A"                     |
| 8                | Z, 2020                          | 4620                             | Single character model "Z"                     |
| 9                | cIvIc, 2020                      | 6620                             | Case insensitivity in model name              |
| 10               | Honda  Accord, 2020              | 10620                            | Multiple spaces in model name                  |
| 11               | RX-8, 2010                      | 6210                             | Model with special characters repeated test   |
| 12               | Tesla, 9999999                  | 10005699                         | Very large year input                          |
| 13               | ABCDEFGHIJKLMNOPQRSTUVWXYZ, 2020 | 37120                            | Model with all alphabet letters                |

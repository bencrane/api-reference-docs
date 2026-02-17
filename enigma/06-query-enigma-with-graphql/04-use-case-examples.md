# Use Case Examples

URL: https://documentation.enigma.com/guides/graphql/use-case-examples

## How find for the brand "McDonald's" and the addresses that it's currently operating from in Albany, NY

Request
```graphql
query Search {
    search(
        searchInput: { name: "McDonald's", entityType: BRAND, conditions: { limit: 1 } }
    ) {
        ... on Brand {
            id
            names(first: 1) {
                edges {
                    node {
                        name
                    }
                }
            }
            operatingLocations(
                conditions: {
                    filter: {
                        AND: [
                            { EQ: ["addresses.city", "ALBANY"] }
                            { EQ: ["addresses.state", "NY"] }
                            { EQ: ["operatingStatuses.operatingStatus", "Open"] }
                        ]
                    }
                }
            ) {
                edges {
                    node {
                        names(first: 1) {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                        addresses(first: 1) {
                            edges {
                                node {
                                    fullAddress
                                    city
                                    state
                                    zip
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "id": "2daa02e4-f887-40f5-8bd2-c00764b91e76",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                },
                "operatingLocations": {
                    "edges": [
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "106 WOLF RD ALBANY NY 12205",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "ALBANY NY 12220",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12220"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "161 WASHINGTON EXT AVE ALBANY NY 12205",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "256 OSBORNE RD ALBANY NY 12211",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12211"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "1814 CENTRAL AVE ALBANY NY 12205",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "31 HOLLAND AVE ALBANY NY 12209",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12209"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "1602 WESTERN AVE ALBANY NY 12203",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12203"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "391 CENTRAL AVE ALBANY NY 12206",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12206"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "1006 CENTRAL AVE ALBANY NY 12205",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12205"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

## For McDonald's in Albany, NY find the subset that were operating on Jan 1, 2024

Request
```graphql
query Search {
    search(
        searchInput: { name: "McDonald's", entityType: BRAND, conditions: { limit: 1 } }
    ) {
        ... on Brand {
            id
            names(first: 1) {
                edges {
                    node {
                        name
                    }
                }
            }
            operatingLocations(
                conditions: {
                    filter: {
                        AND: [
                            { EQ: ["addresses.city", "ALBANY"] },
                            { EQ: ["addresses.state", "NY"] },
                            { EQ: ["operatingStatuses.operatingStatus", "Open"] },
                            {LTE: ["operatingStatuses.lastObservedDate", "2024-01-01"]}
                        ]
                    }
                }
            ) {
                edges {
                    node {
                        names(first: 1) {
                            edges {
                                node {
                                    name
                                }
                            }
                        }
                        addresses(first: 1) {
                            edges {
                                node {
                                    fullAddress
                                    city
                                    state
                                    zip
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
```

Response
```json
{
    "data": {
        "search": [
            {
                "id": "2daa02e4-f887-40f5-8bd2-c00764b91e76",
                "names": {
                    "edges": [
                        {
                            "node": {
                                "name": "MCDONALD'S"
                            }
                        }
                    ]
                },
                "operatingLocations": {
                    "edges": [
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "ALBANY NY 12220",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12220"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "256 OSBORNE RD ALBANY NY 12211",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12211"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "31 HOLLAND AVE ALBANY NY 12209",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12209"
                                            }
                                        }
                                    ]
                                }
                            }
                        },
                        {
                            "node": {
                                "names": {
                                    "edges": [
                                        {
                                            "node": {
                                                "name": "MCDONALD'S"
                                            }
                                        }
                                    ]
                                },
                                "addresses": {
                                    "edges": [
                                        {
                                            "node": {
                                                "fullAddress": "391 CENTRAL AVE ALBANY NY 12206",
                                                "city": "ALBANY",
                                                "state": "NY",
                                                "zip": "12206"
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```
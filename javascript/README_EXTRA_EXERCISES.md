# Extra Exercises: Modern JavaScript for Playwright QA

## Overview

This collection adds **88 new JavaScript exercise files** across **14 "extra" folders** to complement the existing 30 exercise folders (ex_01 through ex_30). These files cover **modern JavaScript concepts** that QA engineers need when learning Playwright — concepts that go beyond the Java-to-JavaScript basics already covered.

Every file is **self-contained** and **runnable** with `node filename.js` (no external packages required).

## Naming Convention

| Element | Pattern | Example |
|---------|---------|---------|
| Folder | `ex_XX_TopicName_extra/` | `ex_13_Functions_extra/` |
| File | `Extra_XX_TopicName.js` | `Extra_01_ArrowFunction_Syntax.js` |
| New topics | `ex_31` through `ex_36` with `_extra` suffix | `ex_31_Promises_AsyncAwait_extra/` |

The `_extra` suffix and `Extra_` prefix avoid any collision with existing `LabXXX_` files.

## Concept Coverage Map

| # | Folder | Missing Concept Addressed | Files |
|---|--------|--------------------------|-------|
| 1 | `ex_04_Operators_extra/` | Spread/Rest, Optional Chaining, Nullish Coalescing | 6 |
| 2 | `ex_10_For_Loop_extra/` | `for...of`, `for...in`, Iterators, Generators | 4 |
| 3 | `ex_13_Functions_extra/` | Arrow Functions, Closures, Callbacks, Scope/Hoisting | 8 |
| 4 | `ex_14_Strings_extra/` | Template Literals, Regular Expressions | 6 |
| 5 | `ex_16_Arrays_extra/` | Destructuring, `.map()`, `.filter()`, `.reduce()`, Method Chaining | 7 |
| 6 | `ex_27_Exceptions_extra/` | Error Types, Custom Errors, Async Error Handling | 4 |
| 7 | `ex_28_Object_extra/` | Object Destructuring, Object Methods, JSON | 7 |
| 8 | `ex_30_Collection_Framework_extra/` | Advanced Map/Set, `Array.from()`, Iterables | 6 |
| 9 | `ex_31_Promises_AsyncAwait_extra/` | Promises, async/await (NEW TOPIC) | 8 |
| 10 | `ex_32_ES_Modules_extra/` | CommonJS, ES Modules, Dynamic Import (NEW TOPIC) | 5 |
| 11 | `ex_33_Node_fs_path_env_extra/` | fs, path, process.env, os (NEW TOPIC) | 6 |
| 12 | `ex_34_Test_Structure_Hooks_extra/` | Test anatomy, Fixtures, Config, Reporters (NEW TOPIC) | 8 |
| 13 | `ex_35_Page_Object_Model_extra/` | POM pattern for Playwright (NEW TOPIC) | 7 |
| 14 | `ex_36_Data_Driven_Testing_extra/` | Parameterized tests, CSV/JSON data, Fixtures (NEW TOPIC) | 6 |
| | **TOTAL** | | **88** |

## Recommended Learning Sequence

Follow this numbered path for the best learning experience:

### Phase 1: Language Foundations (30 files)
1. **ex_04_Operators_extra/** — Spread, Rest, Optional Chaining, Nullish Coalescing
2. **ex_13_Functions_extra/** — Arrow Functions, Callbacks, Closures, Scope
3. **ex_14_Strings_extra/** — Template Literals, Regular Expressions
4. **ex_10_For_Loop_extra/** — Modern Iteration (`for...of`, `for...in`, Generators)

### Phase 2: Data Handling (20 files)
5. **ex_16_Arrays_extra/** — Destructuring, `.map()`, `.filter()`, `.reduce()`, Chaining
6. **ex_28_Object_extra/** — Object Destructuring, Object Methods, JSON
7. **ex_30_Collection_Framework_extra/** — Advanced Map/Set, Iterables

### Phase 3: Async & Modules (17 files)
8. **ex_27_Exceptions_extra/** — Error Types, Custom Errors, Async Error Handling
9. **ex_31_Promises_AsyncAwait_extra/** — Promises, async/await
10. **ex_32_ES_Modules_extra/** — CommonJS, ES Modules, Dynamic Import

### Phase 4: Playwright-Specific (21 files)
11. **ex_33_Node_fs_path_env_extra/** — Node.js fs, path, environment variables
12. **ex_34_Test_Structure_Hooks_extra/** — Test structure, Fixtures, Config, Reporters
13. **ex_35_Page_Object_Model_extra/** — Page Object Model pattern
14. **ex_36_Data_Driven_Testing_extra/** — Data-Driven Testing

## File Template

Every file follows a consistent educational format:

```
// Extra_XX_TopicName.js
// Topic: [Concept] - Part X of Y
// Extends: ex_XX_FolderName
//
// CONCEPT: [2-3 sentence explanation]
// JAVA COMPARISON: [How it maps to Java]
// PLAYWRIGHT RELEVANCE: [Where this appears in Playwright]
// ============================================================

console.log("--- Example 1: Basic Usage ---");
// ... working examples ...

console.log("--- Example 2: Practical Pattern ---");
// ... real-world usage ...

// === KEY TAKEAWAYS ===
// 1. First takeaway
// 2. Second takeaway
```

## Per-Folder File Listings

### ex_04_Operators_extra/ (6 files)
| File | Description |
|------|-------------|
| `Extra_01_SpreadOperator_Arrays.js` | Spread for copying/merging arrays |
| `Extra_02_SpreadOperator_Objects.js` | Spread for cloning/merging objects; config merging |
| `Extra_03_RestOperator_Functions.js` | Rest params in functions; replaces Java varargs |
| `Extra_04_SpreadRest_RealExamples.js` | Real-world spread/rest patterns; Playwright config merging |
| `Extra_05_OptionalChaining.js` | `?.` for safe nested property access |
| `Extra_06_NullishCoalescing.js` | `??` and `??=` operators; env variable fallbacks |

### ex_10_For_Loop_extra/ (4 files)
| File | Description |
|------|-------------|
| `Extra_01_ForOf_Loop.js` | `for...of` for arrays, strings, Maps, Sets |
| `Extra_02_ForIn_Loop.js` | `for...in` for object keys; when to use/avoid |
| `Extra_03_Iterators_Generators.js` | Iterator protocol, `Symbol.iterator`, generator functions |
| `Extra_04_Modern_Iteration_Patterns.js` | `.entries()`, `.keys()`, `.values()`; Playwright locator patterns |

### ex_13_Functions_extra/ (8 files)
| File | Description |
|------|-------------|
| `Extra_01_ArrowFunction_Syntax.js` | Arrow syntax variations: single/multi param, implicit return |
| `Extra_02_ArrowFunction_vs_Regular.js` | `this` binding, `arguments`, constructor differences |
| `Extra_03_ArrowFunction_Callbacks.js` | Arrows in setTimeout, event patterns, array methods |
| `Extra_04_Callbacks_Basics.js` | Passing functions as arguments; sync callbacks |
| `Extra_05_Callbacks_Async.js` | Async callbacks, setTimeout, "callback hell" problem |
| `Extra_06_Closures_Basics.js` | Lexical scope, closure creation, preserving state |
| `Extra_07_Closures_Practical.js` | Data privacy, factory functions; Playwright helper patterns |
| `Extra_08_Scope_and_Hoisting.js` | `var` vs `let` vs `const`, block scope, hoisting |

### ex_14_Strings_extra/ (6 files)
| File | Description |
|------|-------------|
| `Extra_01_TemplateLiterals_Basics.js` | Backtick strings, `${}` interpolation |
| `Extra_02_TemplateLiterals_Multiline.js` | Multiline strings; Playwright: dynamic selectors |
| `Extra_03_TaggedTemplates.js` | Tagged template functions; safe selector building |
| `Extra_04_Regex_Basics.js` | `/pattern/flags`, `test()`, `match()`, character classes |
| `Extra_05_Regex_Patterns.js` | Email/phone/URL validation; Playwright: `toHaveText(/regex/)` |
| `Extra_06_Regex_Replace_Split.js` | `replace()`, `replaceAll()`, named capture groups |

### ex_16_Arrays_extra/ (7 files)
| File | Description |
|------|-------------|
| `Extra_01_Destructuring_Arrays.js` | Basic assignment, skipping, defaults, rest pattern |
| `Extra_02_Destructuring_Nested.js` | Nested destructuring, swapping, function returns |
| `Extra_03_Map_Method.js` | `.map()` for transforms; Playwright: extracting text from locators |
| `Extra_04_Filter_Method.js` | `.filter()` for selection; Playwright: filtering visible elements |
| `Extra_05_Reduce_Method.js` | `.reduce()` for accumulation; sum, count, grouping |
| `Extra_06_ForEach_Find_Some_Every.js` | `.forEach()`, `.find()`, `.some()`, `.every()` |
| `Extra_07_Chaining_Methods.js` | `.filter().map().reduce()` pipelines; QA data patterns |

### ex_27_Exceptions_extra/ (4 files)
| File | Description |
|------|-------------|
| `Extra_01_Error_Types.js` | TypeError, RangeError, SyntaxError; instanceof checking |
| `Extra_02_Custom_Error_Classes.js` | Extending Error; custom TimeoutError patterns |
| `Extra_03_Async_Error_Handling.js` | try/catch with async/await; unhandled rejections |
| `Extra_04_Error_Handling_Patterns.js` | Retry, fallback, logging; Playwright: soft assertions, retries |

### ex_28_Object_extra/ (7 files)
| File | Description |
|------|-------------|
| `Extra_01_Destructuring_Objects.js` | Basic, renaming, defaults, nested destructuring |
| `Extra_02_Destructuring_Params.js` | Function param destructuring; Playwright: `({ page }) =>` |
| `Extra_03_ObjectMethods_Keys_Values_Entries.js` | `Object.keys/values/entries/assign/freeze` |
| `Extra_04_ObjectMethods_Advanced.js` | `Object.create`, computed properties, shorthand |
| `Extra_05_JSON_Parse_Stringify.js` | `JSON.parse()`, `JSON.stringify()`, formatting |
| `Extra_06_JSON_Files_and_APIs.js` | Reading JSON files; Playwright: `response.json()` |
| `Extra_07_JSON_TestData.js` | JSON as test data source; fixture data loading |

### ex_30_Collection_Framework_extra/ (6 files)
| File | Description |
|------|-------------|
| `Extra_01_Map_Advanced.js` | Map vs objects; WeakMap; complex keys |
| `Extra_02_Set_Advanced.js` | Set operations (union, intersection, difference); WeakSet |
| `Extra_03_Array_From_Conversion.js` | `Array.from()`, `Array.of()`, NodeList conversion |
| `Extra_04_Iterables_and_Spread.js` | Iterating Maps/Sets with spread and `for...of` |
| `Extra_05_Object_as_Dictionary.js` | Objects as key-value stores; `Object.fromEntries()` |
| `Extra_06_Collection_Patterns_Testing.js` | QA patterns: grouping results, deduplication |

### ex_31_Promises_AsyncAwait_extra/ (8 files)
| File | Description |
|------|-------------|
| `Extra_01_Sync_vs_Async.js` | Event loop concept; why Playwright needs async |
| `Extra_02_Promise_Basics.js` | Promise constructor, resolve, reject, then/catch/finally |
| `Extra_03_Promise_Chaining.js` | Sequential chains; returning values between `.then()` |
| `Extra_04_Promise_All_Race.js` | `Promise.all/allSettled/race/any`; parallel execution |
| `Extra_05_AsyncAwait_Basics.js` | `async`/`await` syntax; Playwright: every action awaited |
| `Extra_06_AsyncAwait_ErrorHandling.js` | try/catch with await; TimeoutError handling |
| `Extra_07_AsyncAwait_Loops.js` | Sequential `for...of` + await; parallel `Promise.all` + map |
| `Extra_08_AsyncAwait_RealPatterns.js` | Retry logic, polling; Playwright wait patterns |

### ex_32_ES_Modules_extra/ (5 files)
| File | Description |
|------|-------------|
| `Extra_01_CommonJS_Require.js` | Review of require/module.exports (existing pattern) |
| `Extra_02_ESModules_ExportImport.mjs` | `export`/`import` syntax; named vs default |
| `Extra_03_ReExport_Barrel.js` | Barrel files for organizing page objects/helpers |
| `Extra_04_Dynamic_Import.js` | `import()` for lazy/conditional loading |
| `Extra_05_Module_Patterns.js` | CommonJS vs ESM comparison; Playwright uses ESM |

### ex_33_Node_fs_path_env_extra/ (6 files)
| File | Description |
|------|-------------|
| `Extra_01_FS_ReadFile.js` | `fs.readFileSync` and `fs.promises.readFile`; test data |
| `Extra_02_FS_WriteFile.js` | `fs.writeFileSync`; writing results, logs |
| `Extra_03_FS_Directory_Operations.js` | mkdir, readdir, exists; screenshot directories |
| `Extra_04_Path_Module.js` | `path.join`, `path.resolve`, `__dirname`; cross-platform paths |
| `Extra_05_Environment_Variables.js` | `process.env`, dotenv; BASE_URL, HEADLESS config |
| `Extra_06_Process_and_OS.js` | `process.argv`, `process.cwd()`, `os.platform()` |

### ex_34_Test_Structure_Hooks_extra/ (8 files)
| File | Description |
|------|-------------|
| `Extra_01_Test_Describe_It.js` | `test.describe()`, `test()`, `test.skip`, `test.only` |
| `Extra_02_Test_Assertions.js` | `expect()` matchers; Playwright: toHaveText, toBeVisible |
| `Extra_03_BeforeAfter_Hooks.js` | beforeAll/beforeEach/afterEach/afterAll; vs Java @Before |
| `Extra_04_Fixtures_Basics.js` | `{ page, browser, context }` auto setup/teardown |
| `Extra_05_Custom_Fixtures.js` | `test.extend()`; authenticated state, test data fixtures |
| `Extra_06_Test_Organization.js` | Nested describes, tagging, grep, serial mode |
| `Extra_07_Test_Configuration.js` | `playwright.config.js`: projects, retries, timeouts |
| `Extra_08_Test_Reporting.js` | Reporters (list, html, json); trace viewer; screenshots |

### ex_35_Page_Object_Model_extra/ (7 files)
| File | Description |
|------|-------------|
| `Extra_01_POM_Concept.js` | Why POM; separation of concerns; Java Selenium vs Playwright |
| `Extra_02_POM_BasicPage.js` | LoginPage class: constructor(page), locators, actions |
| `Extra_03_POM_Locator_Strategies.js` | CSS vs XPath vs getByRole/getByText best practices |
| `Extra_04_POM_Navigation_Actions.js` | goto, fill, click, waitForURL; returning new pages |
| `Extra_05_POM_Assertions_in_Tests.js` | Assertions stay in tests, not in page objects |
| `Extra_06_POM_BasePage_Inheritance.js` | BasePage with shared methods; child pages extend it |
| `Extra_07_POM_Complete_Example.js` | Full flow: Login -> Dashboard -> Profile; test file |

### ex_36_Data_Driven_Testing_extra/ (6 files)
| File | Description |
|------|-------------|
| `Extra_01_Parameterized_Tests.js` | Array of data + loop calling test(); vs Java @DataProvider |
| `Extra_02_CSV_Test_Data.js` | CSV parsing; running tests per row |
| `Extra_03_JSON_Test_Data.js` | Loading scenarios from JSON; environment-specific data |
| `Extra_04_Environment_Config.js` | Switching data by process.env.ENV; credential handling |
| `Extra_05_Dynamic_Test_Generation.js` | Programmatic test() generation from data arrays |
| `Extra_06_Fixtures_as_Data.js` | Fixtures injecting test data; combining with POM |

## How to Run

```bash
# Run any single file
node javascript/ex_13_Functions_extra/Extra_01_ArrowFunction_Syntax.js

# Run all files in a folder
for f in javascript/ex_13_Functions_extra/*.js; do echo "=== $f ==="; node "$f"; done

# Run all extra exercises
for dir in javascript/ex_*_extra; do
  for f in "$dir"/*.js "$dir"/*.mjs; do
    [ -f "$f" ] && node "$f"
  done
done
```

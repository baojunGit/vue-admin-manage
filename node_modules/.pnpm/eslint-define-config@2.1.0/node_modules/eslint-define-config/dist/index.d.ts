import { Linter, ESLint } from 'eslint';

/**
 * A literal type that supports custom further strings but preserves autocompletion in IDEs.
 *
 * @see [copied from issue](https://github.com/microsoft/TypeScript/issues/29729#issuecomment-471566609)
 */
type LiteralUnion<TUnion extends TBase, TBase = string> =
  | TUnion
  | (TBase & { zz_IGNORE_ME?: never });

// Some types copied from `@types/eslint` `Linter.ParserOptions`

/**
 * Any valid ECMAScript version number or 'latest':
 *
 * - A version: es3, es5, es6, es7, es8, es9, es10, es11, es12, es13, es14, ...
 * - A year: es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, ...
 * - 'latest'
 *
 * @see https://typescript-eslint.io/architecture/parser/#ecmaversion
 */
type EcmaVersion =
  | 3
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 'latest';

/**
 * Set to "script" (default) or "module" if your code is in ECMAScript modules.
 */
type SourceType = 'script' | 'module';

/**
 * An object indicating which additional language features you'd like to use.
 *
 * @see https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options
 * @see https://typescript-eslint.io/architecture/parser#ecmafeatures
 */
interface EcmaFeatures extends Partial<Record<string, boolean>> {
  /**
   * Allow `return` statements in the global scope.
   */
  globalReturn?: boolean;

  /**
   * Enable global [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) (if `ecmaVersion` is 5 or greater).
   */
  impliedStrict?: boolean;

  /**
   * Enable [JSX](https://facebook.github.io/jsx).
   */
  jsx?: boolean;
}

/** Lib. */
type Lib = LiteralUnion<
  | 'es5'
  | 'es6'
  | 'es2015'
  | 'es7'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'esnext'
  | 'dom'
  | 'dom.iterable'
  | 'webworker'
  | 'webworker.importscripts'
  | 'webworker.iterable'
  | 'scripthost'
  | 'es2015.core'
  | 'es2015.collection'
  | 'es2015.generator'
  | 'es2015.iterable'
  | 'es2015.promise'
  | 'es2015.proxy'
  | 'es2015.reflect'
  | 'es2015.symbol'
  | 'es2015.symbol.wellknown'
  | 'es2016.array.include'
  | 'es2017.object'
  | 'es2017.sharedmemory'
  | 'es2017.string'
  | 'es2017.intl'
  | 'es2017.typedarrays'
  | 'es2018.asyncgenerator'
  | 'es2018.asynciterable'
  | 'es2018.intl'
  | 'es2018.promise'
  | 'es2018.regexp'
  | 'es2019.array'
  | 'es2019.object'
  | 'es2019.string'
  | 'es2019.symbol'
  | 'es2020.bigint'
  | 'es2020.promise'
  | 'es2020.sharedmemory'
  | 'es2020.string'
  | 'es2020.symbol.wellknown'
  | 'es2020.intl'
  | 'esnext.array'
  | 'esnext.symbol'
  | 'esnext.asynciterable'
  | 'esnext.intl'
  | 'esnext.bigint'
  | 'esnext.string'
  | 'esnext.promise'
  | 'esnext.weakref'
  | 'es2016.full'
  | 'es2017.full'
  | 'es2018.full'
  | 'es2019.full'
  | 'es2020.full'
  | 'esnext.full'
  | 'lib'
>;

/**
 * This is a special exported interface for other packages to declare
 * additional parsers that should bail out for eslint parsers. For example
 * `'@typescript-eslint/eslint-plugin'` can declare it like so in its `d.ts`:
 *
 * ```ts
 * declare module 'eslint-define-config' {
 *   export interface CustomParsers {
 *     '@typescript-eslint/parser': void;
 *   }
 * }
 * ```
 */
interface CustomParsers {}

/** Parser. */
type Parser = LiteralUnion<keyof CustomParsers>;

/**
 * This is a special exported interface for other packages to declare
 * additional parser options that should bail out for eslint parser options. For example
 * `@typescript-eslint/eslint-plugin` can declare it like so in its `d.ts`:
 *
 * ```ts
 * declare module 'eslint-define-config' {
 *   export interface CustomParserOptions {
 *     /**
 *      * This option allows you to provide the root directory for relative tsconfig paths specified in the `project` option above.
 *      *
 *      * \@see [tsconfigRootDir](https://typescript-eslint.io/architecture/parser/#tsconfigrootdir)
 *      *\/
 *     tsconfigRootDir?: string;
 *
 *     useJSXTextNode?: boolean;
 *
 *     /**
 *      * This option allows you to toggle the warning that the parser will give you if you use a version of TypeScript which is not explicitly supported.
 *      *
 *      * \@default true
 *      *
 *      * \@see [warnOnUnsupportedTypeScriptVersion](https://typescript-eslint.io/architecture/parser/#warnonunsupportedtypescriptversion)
 *      *\/
 *     warnOnUnsupportedTypeScriptVersion?: boolean;
 *
 *     /**
 *      * This option allow you to tell parser to act as if `emitDecoratorMetadata: true` is set in `tsconfig.json`, but without [type-aware linting](https://typescript-eslint.io/linting/typed-linting).
 *      * In other words, you don't have to specify `parserOptions.project` in this case, making the linting process faster.
 *      *
 *      * \@default undefined
 *      *
 *      * \@see [emitDecoratorMetadata](https://typescript-eslint.io/architecture/parser/#emitdecoratormetadata)
 *      *\/
 *     emitDecoratorMetadata?: boolean;
 *   }
 * }
 * ```
 */
interface CustomParserOptions {}

/**
 * Parser options.
 *
 * @see [Specifying Parser Options](https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options)
 */
interface ParserOptions
  extends Partial<CustomParserOptions>,
    Partial<Record<string, unknown>> {
  /**
   * Accepts any valid ECMAScript version number or `'latest'`:
   *
   * - A version: es3, es5, es6, es7, es8, es9, es10, es11, es12, es13, es14, ..., or
   * - A year: es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, ..., or
   * - `'latest'`
   *
   * When it's a version or a year, the value must be a number - so do not include the `es` prefix.
   *
   * Specifies the version of ECMAScript syntax you want to use. This is used by the parser to determine how to perform scope analysis, and it affects the default
   *
   * @default 2018
   *
   * @see https://typescript-eslint.io/architecture/parser/#ecmaversion
   */
  ecmaVersion?: EcmaVersion;

  /**
   * Set to "script" (default) or "module" if your code is in ECMAScript modules.
   *
   * @default 'script'
   *
   * @see https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options
   */
  sourceType?: SourceType;

  /**
   * An object indicating which additional language features you'd like to use.
   *
   * @see https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options
   * @see https://typescript-eslint.io/architecture/parser#ecmafeatures
   */
  ecmaFeatures?: EcmaFeatures;

  /**
   * Parser.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/developer-guide/working-with-custom-parsers)
   * @see [Specifying Parser](https://eslint.org/docs/user-guide/configuring/plugins#specifying-parser)
   */
  parser?: Parser;
}

// Synced to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/042141ce5f77f36df01c344ad09f32feda26c4fd/types/eslint/index.d.ts#L714-L716

/**
 * Rule ordinal severity.
 */
type Severity = 0 | 1 | 2;

/**
 * Rule severity.
 */
type RuleLevel = Severity | 'off' | 'warn' | 'error';

// Synced to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/042141ce5f77f36df01c344ad09f32feda26c4fd/types/eslint/helpers.d.ts#L1-L3

type Prepend<TTuple extends any[], TAddend> = ((
  _: TAddend,
  ..._1: TTuple
) => any) extends (..._: infer Result) => any
  ? Result
  : never;

// Synced to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/042141ce5f77f36df01c344ad09f32feda26c4fd/types/eslint/index.d.ts#L717-L719

/**
 * Rule configuration.
 */
type RuleLevelAndOptions<TOptions extends any[] = any[]> = Prepend<
  Partial<TOptions>,
  RuleLevel
>;

type RuleEntry<TOptions extends any[] = any[]> =
  | RuleLevel
  | RuleLevelAndOptions<TOptions>;

/**
 * Rule configuration.
 *
 * @alias RuleEntry
 */
type RuleConfig<TOptions extends any[] = any[]> = RuleEntry<TOptions>;

interface Schema0$2N {
  getWithoutSet?: boolean;
  setWithoutGet?: boolean;
  enforceForClassMembers?: boolean;
}

type AccessorPairsRuleOptions = [Schema0$2N?];

type Schema0$2M =
  | ('always' | 'never' | 'consistent')
  | {
      multiline?: boolean;
      minItems?: number | null;
    };

type ArrayBracketNewlineRuleOptions = [Schema0$2M?];

type Schema0$2L = 'always' | 'never';

interface Schema1$n {
  singleValue?: boolean;
  objectsInArrays?: boolean;
  arraysInArrays?: boolean;
}

type ArrayBracketSpacingRuleOptions = [Schema0$2L?, Schema1$n?];

interface Schema0$2K {
  allowImplicit?: boolean;
  checkForEach?: boolean;
  allowVoid?: boolean;
}

type ArrayCallbackReturnRuleOptions = [Schema0$2K?];

type Schema0$2J =
  | []
  | [
      | BasicConfig
      | {
          ArrayExpression?: BasicConfig;
          ArrayPattern?: BasicConfig;
        },
    ];
type BasicConfig =
  | ('always' | 'never' | 'consistent')
  | {
      multiline?: boolean;
      minItems?: number | null;
    };

type ArrayElementNewlineRuleOptions = Schema0$2J;

type Schema0$2I =
  | []
  | ['always' | 'never']
  | []
  | ['as-needed']
  | [
      'as-needed',
      {
        requireReturnForObjectLiteral?: boolean;
      },
    ];

type ArrowBodyStyleRuleOptions = Schema0$2I;

type Schema0$2H = 'always' | 'as-needed';

interface Schema1$m {
  requireForBlockBody?: boolean;
}

type ArrowParensRuleOptions = [Schema0$2H?, Schema1$m?];

interface Schema0$2G {
  before?: boolean;
  after?: boolean;
}

type ArrowSpacingRuleOptions = [Schema0$2G?];

type BlockScopedVarRuleOptions = [];

type Schema0$2F = 'always' | 'never';

type BlockSpacingRuleOptions = [Schema0$2F?];

type Schema0$2E = '1tbs' | 'stroustrup' | 'allman';

interface Schema1$l {
  allowSingleLine?: boolean;
}

type BraceStyleRuleOptions = [Schema0$2E?, Schema1$l?];

type Schema0$2D = string[];

type CallbackReturnRuleOptions = [Schema0$2D?];

interface Schema0$2C {
  ignoreDestructuring?: boolean;
  ignoreImports?: boolean;
  ignoreGlobals?: boolean;
  properties?: 'always' | 'never';
  /**
   * @minItems 0
   */
  allow?: [] | [string];
}

type CamelcaseRuleOptions = [Schema0$2C?];

type Schema0$2B = 'always' | 'never';

type Schema1$k =
  | {
      ignorePattern?: string;
      ignoreInlineComments?: boolean;
      ignoreConsecutiveComments?: boolean;
    }
  | {
      line?: {
        ignorePattern?: string;
        ignoreInlineComments?: boolean;
        ignoreConsecutiveComments?: boolean;
      };
      block?: {
        ignorePattern?: string;
        ignoreInlineComments?: boolean;
        ignoreConsecutiveComments?: boolean;
      };
    };

type CapitalizedCommentsRuleOptions = [Schema0$2B?, Schema1$k?];

interface Schema0$2A {
  exceptMethods?: string[];
  enforceForClassFields?: boolean;
}

type ClassMethodsUseThisRuleOptions = [Schema0$2A?];

type Schema0$2z =
  | []
  | [
      | Value$1
      | {
          arrays?: ValueWithIgnore;
          objects?: ValueWithIgnore;
          imports?: ValueWithIgnore;
          exports?: ValueWithIgnore;
          functions?: ValueWithIgnore;
        },
    ];
type Value$1 = 'always-multiline' | 'always' | 'never' | 'only-multiline';
type ValueWithIgnore =
  | 'always-multiline'
  | 'always'
  | 'ignore'
  | 'never'
  | 'only-multiline';

type CommaDangleRuleOptions = Schema0$2z;

interface Schema0$2y {
  before?: boolean;
  after?: boolean;
}

type CommaSpacingRuleOptions = [Schema0$2y?];

type Schema0$2x = 'first' | 'last';

interface Schema1$j {
  exceptions?: {
    [k: string]: boolean;
  };
}

type CommaStyleRuleOptions = [Schema0$2x?, Schema1$j?];

type Schema0$2w =
  | number
  | {
      maximum?: number;
      max?: number;
    };

type ComplexityRuleOptions = [Schema0$2w?];

type Schema0$2v = 'always' | 'never';

interface Schema1$i {
  enforceForClassMembers?: boolean;
}

type ComputedPropertySpacingRuleOptions = [Schema0$2v?, Schema1$i?];

interface Schema0$2u {
  treatUndefinedAsUnspecified?: boolean;
}

type ConsistentReturnRuleOptions = [Schema0$2u?];

type Schema0$2t = string[];

type ConsistentThisRuleOptions = Schema0$2t;

type ConstructorSuperRuleOptions = [];

type Schema0$2s =
  | []
  | ['all']
  | []
  | ['multi' | 'multi-line' | 'multi-or-nest']
  | ['multi' | 'multi-line' | 'multi-or-nest', 'consistent'];

type CurlyRuleOptions = Schema0$2s;

interface Schema0$2r {
  commentPattern?: string;
}

type DefaultCaseRuleOptions = [Schema0$2r?];

type DefaultCaseLastRuleOptions = [];

type DefaultParamLastRuleOptions = [];

type Schema0$2q = 'object' | 'property';

type DotLocationRuleOptions = [Schema0$2q?];

interface Schema0$2p {
  allowKeywords?: boolean;
  allowPattern?: string;
}

type DotNotationRuleOptions = [Schema0$2p?];

type Schema0$2o = 'always' | 'never' | 'unix' | 'windows';

type EolLastRuleOptions = [Schema0$2o?];

type Schema0$2n =
  | []
  | ['always']
  | [
      'always',
      {
        null?: 'always' | 'never' | 'ignore';
      },
    ]
  | []
  | ['smart' | 'allow-null'];

type EqeqeqRuleOptions = Schema0$2n;

type ForDirectionRuleOptions = [];

type Schema0$2m =
  | []
  | ['never']
  | []
  | ['always']
  | [
      'always',
      {
        allowNewlines?: boolean;
      },
    ];

type FuncCallSpacingRuleOptions = Schema0$2m;

type Schema0$2l =
  | []
  | ['always' | 'never']
  | [
      'always' | 'never',
      {
        considerPropertyDescriptor?: boolean;
        includeCommonJSModuleExports?: boolean;
      },
    ]
  | []
  | [
      {
        considerPropertyDescriptor?: boolean;
        includeCommonJSModuleExports?: boolean;
      },
    ];

type FuncNameMatchingRuleOptions = Schema0$2l;

type Schema0$2k =
  | []
  | [Value]
  | [
      Value,
      {
        generators?: Value;
      },
    ];
type Value = 'always' | 'as-needed' | 'never';

type FuncNamesRuleOptions = Schema0$2k;

type Schema0$2j = 'declaration' | 'expression';

interface Schema1$h {
  allowArrowFunctions?: boolean;
}

type FuncStyleRuleOptions = [Schema0$2j?, Schema1$h?];

type Schema0$2i = 'always' | 'never' | 'consistent';

type FunctionCallArgumentNewlineRuleOptions = [Schema0$2i?];

type Schema0$2h =
  | ('always' | 'never' | 'consistent' | 'multiline' | 'multiline-arguments')
  | {
      minItems?: number;
    };

type FunctionParenNewlineRuleOptions = [Schema0$2h?];

type Schema0$2g =
  | ('before' | 'after' | 'both' | 'neither')
  | {
      before?: boolean;
      after?: boolean;
      named?:
        | ('before' | 'after' | 'both' | 'neither')
        | {
            before?: boolean;
            after?: boolean;
          };
      anonymous?:
        | ('before' | 'after' | 'both' | 'neither')
        | {
            before?: boolean;
            after?: boolean;
          };
      method?:
        | ('before' | 'after' | 'both' | 'neither')
        | {
            before?: boolean;
            after?: boolean;
          };
    };

type GeneratorStarSpacingRuleOptions = [Schema0$2g?];

interface Schema0$2f {
  allowImplicit?: boolean;
}

type GetterReturnRuleOptions = [Schema0$2f?];

type GlobalRequireRuleOptions = [];

type Schema0$2e = 'anyOrder' | 'getBeforeSet' | 'setBeforeGet';

type GroupedAccessorPairsRuleOptions = [Schema0$2e?];

type GuardForInRuleOptions = [];

type Schema0$2d = string;

type HandleCallbackErrRuleOptions = [Schema0$2d?];

type Schema0$2c = string[];

type IdBlacklistRuleOptions = Schema0$2c;

type Schema0$2b = string[];

type IdDenylistRuleOptions = Schema0$2b;

interface Schema0$2a {
  min?: number;
  max?: number;
  exceptions?: string[];
  exceptionPatterns?: string[];
  properties?: 'always' | 'never';
}

type IdLengthRuleOptions = [Schema0$2a?];

type Schema0$29 = string;

interface Schema1$g {
  properties?: boolean;
  classFields?: boolean;
  onlyDeclarations?: boolean;
  ignoreDestructuring?: boolean;
}

type IdMatchRuleOptions = [Schema0$29?, Schema1$g?];

type Schema0$28 = 'beside' | 'below';

type ImplicitArrowLinebreakRuleOptions = [Schema0$28?];

type Schema0$27 = 'tab' | number;

interface Schema1$f {
  SwitchCase?: number;
  VariableDeclarator?:
    | (number | ('first' | 'off'))
    | {
        var?: number | ('first' | 'off');
        let?: number | ('first' | 'off');
        const?: number | ('first' | 'off');
      };
  outerIIFEBody?: number | 'off';
  MemberExpression?: number | 'off';
  FunctionDeclaration?: {
    parameters?: number | ('first' | 'off');
    body?: number;
  };
  FunctionExpression?: {
    parameters?: number | ('first' | 'off');
    body?: number;
  };
  StaticBlock?: {
    body?: number;
  };
  CallExpression?: {
    arguments?: number | ('first' | 'off');
  };
  ArrayExpression?: number | ('first' | 'off');
  ObjectExpression?: number | ('first' | 'off');
  ImportDeclaration?: number | ('first' | 'off');
  flatTernaryExpressions?: boolean;
  offsetTernaryExpressions?: boolean;
  ignoredNodes?: string[];
  ignoreComments?: boolean;
}

type IndentRuleOptions = [Schema0$27?, Schema1$f?];

type Schema0$26 = 'tab' | number;

interface Schema1$e {
  SwitchCase?: number;
  VariableDeclarator?:
    | number
    | {
        var?: number;
        let?: number;
        const?: number;
        [k: string]: unknown;
      };
  outerIIFEBody?: number;
  MemberExpression?: number;
  FunctionDeclaration?: {
    parameters?: number | 'first';
    body?: number;
    [k: string]: unknown;
  };
  FunctionExpression?: {
    parameters?: number | 'first';
    body?: number;
    [k: string]: unknown;
  };
  CallExpression?: {
    parameters?: number | 'first';
    [k: string]: unknown;
  };
  ArrayExpression?: number | 'first';
  ObjectExpression?: number | 'first';
}

type IndentLegacyRuleOptions = [Schema0$26?, Schema1$e?];

type Schema0$25 =
  | []
  | ['always']
  | []
  | ['never']
  | [
      'never',
      {
        ignoreForLoopInit?: boolean;
      },
    ];

type InitDeclarationsRuleOptions = Schema0$25;

type Schema0$24 = 'prefer-single' | 'prefer-double';

type JsxQuotesRuleOptions = [Schema0$24?];

type Schema0$23 =
  | {
      align?:
        | ('colon' | 'value')
        | {
            mode?: 'strict' | 'minimum';
            on?: 'colon' | 'value';
            beforeColon?: boolean;
            afterColon?: boolean;
          };
      mode?: 'strict' | 'minimum';
      beforeColon?: boolean;
      afterColon?: boolean;
    }
  | {
      singleLine?: {
        mode?: 'strict' | 'minimum';
        beforeColon?: boolean;
        afterColon?: boolean;
      };
      multiLine?: {
        align?:
          | ('colon' | 'value')
          | {
              mode?: 'strict' | 'minimum';
              on?: 'colon' | 'value';
              beforeColon?: boolean;
              afterColon?: boolean;
            };
        mode?: 'strict' | 'minimum';
        beforeColon?: boolean;
        afterColon?: boolean;
      };
    }
  | {
      singleLine?: {
        mode?: 'strict' | 'minimum';
        beforeColon?: boolean;
        afterColon?: boolean;
      };
      multiLine?: {
        mode?: 'strict' | 'minimum';
        beforeColon?: boolean;
        afterColon?: boolean;
      };
      align?: {
        mode?: 'strict' | 'minimum';
        on?: 'colon' | 'value';
        beforeColon?: boolean;
        afterColon?: boolean;
      };
    };

type KeySpacingRuleOptions = [Schema0$23?];

interface Schema0$22 {
  before?: boolean;
  after?: boolean;
  overrides?: {
    abstract?: {
      before?: boolean;
      after?: boolean;
    };
    as?: {
      before?: boolean;
      after?: boolean;
    };
    async?: {
      before?: boolean;
      after?: boolean;
    };
    await?: {
      before?: boolean;
      after?: boolean;
    };
    boolean?: {
      before?: boolean;
      after?: boolean;
    };
    break?: {
      before?: boolean;
      after?: boolean;
    };
    byte?: {
      before?: boolean;
      after?: boolean;
    };
    case?: {
      before?: boolean;
      after?: boolean;
    };
    catch?: {
      before?: boolean;
      after?: boolean;
    };
    char?: {
      before?: boolean;
      after?: boolean;
    };
    class?: {
      before?: boolean;
      after?: boolean;
    };
    const?: {
      before?: boolean;
      after?: boolean;
    };
    continue?: {
      before?: boolean;
      after?: boolean;
    };
    debugger?: {
      before?: boolean;
      after?: boolean;
    };
    default?: {
      before?: boolean;
      after?: boolean;
    };
    delete?: {
      before?: boolean;
      after?: boolean;
    };
    do?: {
      before?: boolean;
      after?: boolean;
    };
    double?: {
      before?: boolean;
      after?: boolean;
    };
    else?: {
      before?: boolean;
      after?: boolean;
    };
    enum?: {
      before?: boolean;
      after?: boolean;
    };
    export?: {
      before?: boolean;
      after?: boolean;
    };
    extends?: {
      before?: boolean;
      after?: boolean;
    };
    false?: {
      before?: boolean;
      after?: boolean;
    };
    final?: {
      before?: boolean;
      after?: boolean;
    };
    finally?: {
      before?: boolean;
      after?: boolean;
    };
    float?: {
      before?: boolean;
      after?: boolean;
    };
    for?: {
      before?: boolean;
      after?: boolean;
    };
    from?: {
      before?: boolean;
      after?: boolean;
    };
    function?: {
      before?: boolean;
      after?: boolean;
    };
    get?: {
      before?: boolean;
      after?: boolean;
    };
    goto?: {
      before?: boolean;
      after?: boolean;
    };
    if?: {
      before?: boolean;
      after?: boolean;
    };
    implements?: {
      before?: boolean;
      after?: boolean;
    };
    import?: {
      before?: boolean;
      after?: boolean;
    };
    in?: {
      before?: boolean;
      after?: boolean;
    };
    instanceof?: {
      before?: boolean;
      after?: boolean;
    };
    int?: {
      before?: boolean;
      after?: boolean;
    };
    interface?: {
      before?: boolean;
      after?: boolean;
    };
    let?: {
      before?: boolean;
      after?: boolean;
    };
    long?: {
      before?: boolean;
      after?: boolean;
    };
    native?: {
      before?: boolean;
      after?: boolean;
    };
    new?: {
      before?: boolean;
      after?: boolean;
    };
    null?: {
      before?: boolean;
      after?: boolean;
    };
    of?: {
      before?: boolean;
      after?: boolean;
    };
    package?: {
      before?: boolean;
      after?: boolean;
    };
    private?: {
      before?: boolean;
      after?: boolean;
    };
    protected?: {
      before?: boolean;
      after?: boolean;
    };
    public?: {
      before?: boolean;
      after?: boolean;
    };
    return?: {
      before?: boolean;
      after?: boolean;
    };
    set?: {
      before?: boolean;
      after?: boolean;
    };
    short?: {
      before?: boolean;
      after?: boolean;
    };
    static?: {
      before?: boolean;
      after?: boolean;
    };
    super?: {
      before?: boolean;
      after?: boolean;
    };
    switch?: {
      before?: boolean;
      after?: boolean;
    };
    synchronized?: {
      before?: boolean;
      after?: boolean;
    };
    this?: {
      before?: boolean;
      after?: boolean;
    };
    throw?: {
      before?: boolean;
      after?: boolean;
    };
    throws?: {
      before?: boolean;
      after?: boolean;
    };
    transient?: {
      before?: boolean;
      after?: boolean;
    };
    true?: {
      before?: boolean;
      after?: boolean;
    };
    try?: {
      before?: boolean;
      after?: boolean;
    };
    typeof?: {
      before?: boolean;
      after?: boolean;
    };
    var?: {
      before?: boolean;
      after?: boolean;
    };
    void?: {
      before?: boolean;
      after?: boolean;
    };
    volatile?: {
      before?: boolean;
      after?: boolean;
    };
    while?: {
      before?: boolean;
      after?: boolean;
    };
    with?: {
      before?: boolean;
      after?: boolean;
    };
    yield?: {
      before?: boolean;
      after?: boolean;
    };
  };
}

type KeywordSpacingRuleOptions = [Schema0$22?];

type Schema0$21 =
  | ('above' | 'beside')
  | {
      position?: 'above' | 'beside';
      ignorePattern?: string;
      applyDefaultPatterns?: boolean;
      applyDefaultIgnorePatterns?: boolean;
    };

type LineCommentPositionRuleOptions = [Schema0$21?];

type Schema0$20 = 'unix' | 'windows';

type LinebreakStyleRuleOptions = [Schema0$20?];

interface Schema0$1$ {
  beforeBlockComment?: boolean;
  afterBlockComment?: boolean;
  beforeLineComment?: boolean;
  afterLineComment?: boolean;
  allowBlockStart?: boolean;
  allowBlockEnd?: boolean;
  allowClassStart?: boolean;
  allowClassEnd?: boolean;
  allowObjectStart?: boolean;
  allowObjectEnd?: boolean;
  allowArrayStart?: boolean;
  allowArrayEnd?: boolean;
  ignorePattern?: string;
  applyDefaultIgnorePatterns?: boolean;
  afterHashbangComment?: boolean;
}

type LinesAroundCommentRuleOptions = [Schema0$1$?];

type Schema0$1_ =
  | ('always' | 'never')
  | {
      before?: 'always' | 'never';
      after?: 'always' | 'never';
    };

type LinesAroundDirectiveRuleOptions = [Schema0$1_?];

type Schema0$1Z =
  | {
      /**
       * @minItems 1
       */
      enforce: [
        {
          blankLine: 'always' | 'never';
          prev: 'method' | 'field' | '*';
          next: 'method' | 'field' | '*';
        },
        ...{
          blankLine: 'always' | 'never';
          prev: 'method' | 'field' | '*';
          next: 'method' | 'field' | '*';
        }[],
      ];
    }
  | ('always' | 'never');

interface Schema1$d {
  exceptAfterSingleLine?: boolean;
}

type LinesBetweenClassMembersRuleOptions = [Schema0$1Z?, Schema1$d?];

type Schema0$1Y = (
  | []
  | ['always']
  | [
      'always',
      {
        enforceForIfStatements?: boolean;
      },
    ]
  | ['never']
) &
  unknown[];

type LogicalAssignmentOperatorsRuleOptions = Schema0$1Y;

type Schema0$1X =
  | number
  | {
      ignoreExpressions?: boolean;
      max?: number;
    };

type MaxClassesPerFileRuleOptions = [Schema0$1X?];

type Schema0$1W =
  | number
  | {
      maximum?: number;
      max?: number;
    };

type MaxDepthRuleOptions = [Schema0$1W?];

type Schema0$1V =
  | {
      code?: number;
      comments?: number;
      tabWidth?: number;
      ignorePattern?: string;
      ignoreComments?: boolean;
      ignoreStrings?: boolean;
      ignoreUrls?: boolean;
      ignoreTemplateLiterals?: boolean;
      ignoreRegExpLiterals?: boolean;
      ignoreTrailingComments?: boolean;
    }
  | number;

type Schema1$c =
  | {
      code?: number;
      comments?: number;
      tabWidth?: number;
      ignorePattern?: string;
      ignoreComments?: boolean;
      ignoreStrings?: boolean;
      ignoreUrls?: boolean;
      ignoreTemplateLiterals?: boolean;
      ignoreRegExpLiterals?: boolean;
      ignoreTrailingComments?: boolean;
    }
  | number;

interface Schema2 {
  code?: number;
  comments?: number;
  tabWidth?: number;
  ignorePattern?: string;
  ignoreComments?: boolean;
  ignoreStrings?: boolean;
  ignoreUrls?: boolean;
  ignoreTemplateLiterals?: boolean;
  ignoreRegExpLiterals?: boolean;
  ignoreTrailingComments?: boolean;
}

type MaxLenRuleOptions = [Schema0$1V?, Schema1$c?, Schema2?];

type Schema0$1U =
  | number
  | {
      max?: number;
      skipComments?: boolean;
      skipBlankLines?: boolean;
    };

type MaxLinesRuleOptions = [Schema0$1U?];

type Schema0$1T =
  | {
      max?: number;
      skipComments?: boolean;
      skipBlankLines?: boolean;
      IIFEs?: boolean;
    }
  | number;

type MaxLinesPerFunctionRuleOptions = [Schema0$1T?];

type Schema0$1S =
  | number
  | {
      maximum?: number;
      max?: number;
    };

type MaxNestedCallbacksRuleOptions = [Schema0$1S?];

type Schema0$1R =
  | number
  | {
      maximum?: number;
      max?: number;
    };

type MaxParamsRuleOptions = [Schema0$1R?];

type Schema0$1Q =
  | number
  | {
      maximum?: number;
      max?: number;
    };

interface Schema1$b {
  ignoreTopLevelFunctions?: boolean;
}

type MaxStatementsRuleOptions = [Schema0$1Q?, Schema1$b?];

interface Schema0$1P {
  max?: number;
}

type MaxStatementsPerLineRuleOptions = [Schema0$1P?];

type Schema0$1O =
  | []
  | ['starred-block' | 'bare-block']
  | []
  | ['separate-lines']
  | [
      'separate-lines',
      {
        checkJSDoc?: boolean;
      },
    ];

type MultilineCommentStyleRuleOptions = Schema0$1O;

type Schema0$1N = 'always' | 'always-multiline' | 'never';

type MultilineTernaryRuleOptions = [Schema0$1N?];

interface Schema0$1M {
  newIsCap?: boolean;
  capIsNew?: boolean;
  newIsCapExceptions?: string[];
  newIsCapExceptionPattern?: string;
  capIsNewExceptions?: string[];
  capIsNewExceptionPattern?: string;
  properties?: boolean;
}

type NewCapRuleOptions = [Schema0$1M?];

type Schema0$1L = 'always' | 'never';

type NewParensRuleOptions = [Schema0$1L?];

type Schema0$1K = 'never' | 'always';

type NewlineAfterVarRuleOptions = [Schema0$1K?];

type NewlineBeforeReturnRuleOptions = [];

interface Schema0$1J {
  ignoreChainWithDepth?: number;
}

type NewlinePerChainedCallRuleOptions = [Schema0$1J?];

type NoAlertRuleOptions = [];

type NoArrayConstructorRuleOptions = [];

type NoAsyncPromiseExecutorRuleOptions = [];

type NoAwaitInLoopRuleOptions = [];

interface Schema0$1I {
  allow?: (
    | '^'
    | '|'
    | '&'
    | '<<'
    | '>>'
    | '>>>'
    | '^='
    | '|='
    | '&='
    | '<<='
    | '>>='
    | '>>>='
    | '~'
  )[];
  int32Hint?: boolean;
}

type NoBitwiseRuleOptions = [Schema0$1I?];

type NoBufferConstructorRuleOptions = [];

type NoCallerRuleOptions = [];

type NoCaseDeclarationsRuleOptions = [];

type NoCatchShadowRuleOptions = [];

type NoClassAssignRuleOptions = [];

type NoCompareNegZeroRuleOptions = [];

type Schema0$1H = 'except-parens' | 'always';

type NoCondAssignRuleOptions = [Schema0$1H?];

interface Schema0$1G {
  allowParens?: boolean;
  onlyOneSimpleParam?: boolean;
}

type NoConfusingArrowRuleOptions = [Schema0$1G?];

interface Schema0$1F {
  /**
   * @minItems 1
   */
  allow?: [string, ...string[]];
}

type NoConsoleRuleOptions = [Schema0$1F?];

type NoConstAssignRuleOptions = [];

type NoConstantBinaryExpressionRuleOptions = [];

interface Schema0$1E {
  checkLoops?: boolean;
}

type NoConstantConditionRuleOptions = [Schema0$1E?];

interface Schema0$1D {
  [k: string]: unknown;
}

type NoConstructorReturnRuleOptions = [Schema0$1D?];

type NoContinueRuleOptions = [];

type NoControlRegexRuleOptions = [];

type NoDebuggerRuleOptions = [];

type NoDeleteVarRuleOptions = [];

type NoDivRegexRuleOptions = [];

type NoDupeArgsRuleOptions = [];

type NoDupeClassMembersRuleOptions = [];

type NoDupeElseIfRuleOptions = [];

type NoDupeKeysRuleOptions = [];

type NoDuplicateCaseRuleOptions = [];

interface Schema0$1C {
  includeExports?: boolean;
}

type NoDuplicateImportsRuleOptions = [Schema0$1C?];

interface Schema0$1B {
  allowElseIf?: boolean;
}

type NoElseReturnRuleOptions = [Schema0$1B?];

interface Schema0$1A {
  allowEmptyCatch?: boolean;
}

type NoEmptyRuleOptions = [Schema0$1A?];

type NoEmptyCharacterClassRuleOptions = [];

interface Schema0$1z {
  allow?: (
    | 'functions'
    | 'arrowFunctions'
    | 'generatorFunctions'
    | 'methods'
    | 'generatorMethods'
    | 'getters'
    | 'setters'
    | 'constructors'
    | 'asyncFunctions'
    | 'asyncMethods'
  )[];
}

type NoEmptyFunctionRuleOptions = [Schema0$1z?];

interface Schema0$1y {
  allowObjectPatternsAsParameters?: boolean;
}

type NoEmptyPatternRuleOptions = [Schema0$1y?];

type NoEmptyStaticBlockRuleOptions = [];

type NoEqNullRuleOptions = [];

interface Schema0$1x {
  allowIndirect?: boolean;
}

type NoEvalRuleOptions = [Schema0$1x?];

type NoExAssignRuleOptions = [];

interface Schema0$1w {
  exceptions?: string[];
}

type NoExtendNativeRuleOptions = [Schema0$1w?];

type NoExtraBindRuleOptions = [];

interface Schema0$1v {
  enforceForLogicalOperands?: boolean;
}

type NoExtraBooleanCastRuleOptions = [Schema0$1v?];

type NoExtraLabelRuleOptions = [];

type Schema0$1u =
  | []
  | ['functions']
  | []
  | ['all']
  | [
      'all',
      {
        conditionalAssign?: boolean;
        ternaryOperandBinaryExpressions?: boolean;
        nestedBinaryExpressions?: boolean;
        returnAssign?: boolean;
        ignoreJSX?: 'none' | 'all' | 'single-line' | 'multi-line';
        enforceForArrowConditionals?: boolean;
        enforceForSequenceExpressions?: boolean;
        enforceForNewInMemberExpressions?: boolean;
        enforceForFunctionPrototypeMethods?: boolean;
        allowParensAfterCommentPattern?: string;
      },
    ];

type NoExtraParensRuleOptions = Schema0$1u;

type NoExtraSemiRuleOptions = [];

interface Schema0$1t {
  commentPattern?: string;
  allowEmptyCase?: boolean;
}

type NoFallthroughRuleOptions = [Schema0$1t?];

type NoFloatingDecimalRuleOptions = [];

type NoFuncAssignRuleOptions = [];

interface Schema0$1s {
  exceptions?: string[];
}

type NoGlobalAssignRuleOptions = [Schema0$1s?];

interface Schema0$1r {
  boolean?: boolean;
  number?: boolean;
  string?: boolean;
  disallowTemplateShorthand?: boolean;
  allow?: ('~' | '!!' | '+' | '*')[];
}

type NoImplicitCoercionRuleOptions = [Schema0$1r?];

interface Schema0$1q {
  lexicalBindings?: boolean;
}

type NoImplicitGlobalsRuleOptions = [Schema0$1q?];

type NoImpliedEvalRuleOptions = [];

type NoImportAssignRuleOptions = [];

interface Schema0$1p {
  ignorePattern?: string;
}

type NoInlineCommentsRuleOptions = [Schema0$1p?];

type Schema0$1o = 'functions' | 'both';

type NoInnerDeclarationsRuleOptions = [Schema0$1o?];

interface Schema0$1n {
  allowConstructorFlags?: string[];
}

type NoInvalidRegexpRuleOptions = [Schema0$1n?];

interface Schema0$1m {
  capIsConstructor?: boolean;
}

type NoInvalidThisRuleOptions = [Schema0$1m?];

interface Schema0$1l {
  skipComments?: boolean;
  skipStrings?: boolean;
  skipTemplates?: boolean;
  skipRegExps?: boolean;
  skipJSXText?: boolean;
}

type NoIrregularWhitespaceRuleOptions = [Schema0$1l?];

type NoIteratorRuleOptions = [];

type NoLabelVarRuleOptions = [];

interface Schema0$1k {
  allowLoop?: boolean;
  allowSwitch?: boolean;
}

type NoLabelsRuleOptions = [Schema0$1k?];

type NoLoneBlocksRuleOptions = [];

type NoLonelyIfRuleOptions = [];

type NoLoopFuncRuleOptions = [];

type NoLossOfPrecisionRuleOptions = [];

interface Schema0$1j {
  detectObjects?: boolean;
  enforceConst?: boolean;
  ignore?: (number | string)[];
  ignoreArrayIndexes?: boolean;
  ignoreDefaultValues?: boolean;
  ignoreClassFieldInitialValues?: boolean;
}

type NoMagicNumbersRuleOptions = [Schema0$1j?];

type NoMisleadingCharacterClassRuleOptions = [];

interface Schema0$1i {
  groups?: [
    (
      | '+'
      | '-'
      | '*'
      | '/'
      | '%'
      | '**'
      | '&'
      | '|'
      | '^'
      | '~'
      | '<<'
      | '>>'
      | '>>>'
      | '=='
      | '!='
      | '==='
      | '!=='
      | '>'
      | '>='
      | '<'
      | '<='
      | '&&'
      | '||'
      | 'in'
      | 'instanceof'
      | '?:'
      | '??'
    ),
    (
      | '+'
      | '-'
      | '*'
      | '/'
      | '%'
      | '**'
      | '&'
      | '|'
      | '^'
      | '~'
      | '<<'
      | '>>'
      | '>>>'
      | '=='
      | '!='
      | '==='
      | '!=='
      | '>'
      | '>='
      | '<'
      | '<='
      | '&&'
      | '||'
      | 'in'
      | 'instanceof'
      | '?:'
      | '??'
    ),
    ...(
      | '+'
      | '-'
      | '*'
      | '/'
      | '%'
      | '**'
      | '&'
      | '|'
      | '^'
      | '~'
      | '<<'
      | '>>'
      | '>>>'
      | '=='
      | '!='
      | '==='
      | '!=='
      | '>'
      | '>='
      | '<'
      | '<='
      | '&&'
      | '||'
      | 'in'
      | 'instanceof'
      | '?:'
      | '??'
    )[],
  ][];
  allowSamePrecedence?: boolean;
}

type NoMixedOperatorsRuleOptions = [Schema0$1i?];

type Schema0$1h =
  | boolean
  | {
      grouping?: boolean;
      allowCall?: boolean;
    };

type NoMixedRequiresRuleOptions = [Schema0$1h?];

type Schema0$1g = 'smart-tabs' | true | false;

type NoMixedSpacesAndTabsRuleOptions = [Schema0$1g?];

interface Schema0$1f {
  ignoreNonDeclaration?: boolean;
}

type NoMultiAssignRuleOptions = [Schema0$1f?];

interface Schema0$1e {
  exceptions?: {
    /**
     * This interface was referenced by `undefined`'s JSON-Schema definition
     * via the `patternProperty` "^([A-Z][a-z]*)+$".
     */
    [k: string]: boolean;
  };
  ignoreEOLComments?: boolean;
}

type NoMultiSpacesRuleOptions = [Schema0$1e?];

type NoMultiStrRuleOptions = [];

interface Schema0$1d {
  max: number;
  maxEOF?: number;
  maxBOF?: number;
}

type NoMultipleEmptyLinesRuleOptions = [Schema0$1d?];

interface Schema0$1c {
  exceptions?: string[];
}

type NoNativeReassignRuleOptions = [Schema0$1c?];

type NoNegatedConditionRuleOptions = [];

type NoNegatedInLhsRuleOptions = [];

type NoNestedTernaryRuleOptions = [];

type NoNewRuleOptions = [];

type NoNewFuncRuleOptions = [];

type NoNewNativeNonconstructorRuleOptions = [];

type NoNewObjectRuleOptions = [];

type NoNewRequireRuleOptions = [];

type NoNewSymbolRuleOptions = [];

type NoNewWrappersRuleOptions = [];

type NoNonoctalDecimalEscapeRuleOptions = [];

type NoObjCallsRuleOptions = [];

type NoObjectConstructorRuleOptions = [];

type NoOctalRuleOptions = [];

type NoOctalEscapeRuleOptions = [];

type Schema0$1b =
  | {
      props?: false;
    }
  | {
      props?: true;
      ignorePropertyModificationsFor?: string[];
      ignorePropertyModificationsForRegex?: string[];
    };

type NoParamReassignRuleOptions = [Schema0$1b?];

type NoPathConcatRuleOptions = [];

interface Schema0$1a {
  allowForLoopAfterthoughts?: boolean;
}

type NoPlusplusRuleOptions = [Schema0$1a?];

type NoProcessEnvRuleOptions = [];

type NoProcessExitRuleOptions = [];

interface Schema0$19 {
  allowVoid?: boolean;
}

type NoPromiseExecutorReturnRuleOptions = [Schema0$19?];

type NoProtoRuleOptions = [];

type NoPrototypeBuiltinsRuleOptions = [];

interface Schema0$18 {
  builtinGlobals?: boolean;
}

type NoRedeclareRuleOptions = [Schema0$18?];

type NoRegexSpacesRuleOptions = [];

type Schema0$17 =
  | {
      restrictedNamedExports?: string[];
    }
  | {
      restrictedNamedExports?: string[];
      restrictDefaultExports?: {
        direct?: boolean;
        named?: boolean;
        defaultFrom?: boolean;
        namedFrom?: boolean;
        namespaceFrom?: boolean;
      };
    };

type NoRestrictedExportsRuleOptions = [Schema0$17?];

/**
 * @minItems 0
 */
type Schema0$16 = (
  | string
  | {
      name: string;
      message?: string;
    }
)[];

type NoRestrictedGlobalsRuleOptions = Schema0$16;

type Schema0$15 =
  | (
      | string
      | {
          name: string;
          message?: string;
          importNames?: string[];
        }
    )[]
  | []
  | [
      {
        paths?: (
          | string
          | {
              name: string;
              message?: string;
              importNames?: string[];
            }
        )[];
        patterns?:
          | string[]
          | {
              /**
               * @minItems 1
               */
              importNames?: [string, ...string[]];
              /**
               * @minItems 1
               */
              group: [string, ...string[]];
              importNamePattern?: string;
              message?: string;
              caseSensitive?: boolean;
            }[];
      },
    ];

type NoRestrictedImportsRuleOptions = Schema0$15;

type Schema0$14 =
  | (
      | string
      | {
          name: string;
          message?: string;
        }
    )[]
  | {
      paths?: (
        | string
        | {
            name: string;
            message?: string;
          }
      )[];
      patterns?: string[];
    }[];

type NoRestrictedModulesRuleOptions = Schema0$14;

type Schema0$13 = (
  | {
      object: string;
      property?: string;
      message?: string;
    }
  | {
      object?: string;
      property: string;
      message?: string;
    }
)[];

type NoRestrictedPropertiesRuleOptions = Schema0$13;

/**
 * @minItems 0
 */
type Schema0$12 = (
  | string
  | {
      selector: string;
      message?: string;
    }
)[];

type NoRestrictedSyntaxRuleOptions = Schema0$12;

type Schema0$11 = 'except-parens' | 'always';

type NoReturnAssignRuleOptions = [Schema0$11?];

type NoReturnAwaitRuleOptions = [];

type NoScriptUrlRuleOptions = [];

interface Schema0$10 {
  props?: boolean;
}

type NoSelfAssignRuleOptions = [Schema0$10?];

type NoSelfCompareRuleOptions = [];

interface Schema0$$ {
  allowInParentheses?: boolean;
}

type NoSequencesRuleOptions = [Schema0$$?];

type NoSetterReturnRuleOptions = [];

interface Schema0$_ {
  builtinGlobals?: boolean;
  hoist?: 'all' | 'functions' | 'never';
  allow?: string[];
  ignoreOnInitialization?: boolean;
}

type NoShadowRuleOptions = [Schema0$_?];

type NoShadowRestrictedNamesRuleOptions = [];

type NoSpacedFuncRuleOptions = [];

type NoSparseArraysRuleOptions = [];

interface Schema0$Z {
  allowAtRootLevel?: boolean;
}

type NoSyncRuleOptions = [Schema0$Z?];

interface Schema0$Y {
  allowIndentationTabs?: boolean;
}

type NoTabsRuleOptions = [Schema0$Y?];

type NoTemplateCurlyInStringRuleOptions = [];

type NoTernaryRuleOptions = [];

type NoThisBeforeSuperRuleOptions = [];

type NoThrowLiteralRuleOptions = [];

interface Schema0$X {
  skipBlankLines?: boolean;
  ignoreComments?: boolean;
}

type NoTrailingSpacesRuleOptions = [Schema0$X?];

interface Schema0$W {
  typeof?: boolean;
}

type NoUndefRuleOptions = [Schema0$W?];

type NoUndefInitRuleOptions = [];

type NoUndefinedRuleOptions = [];

interface Schema0$V {
  allow?: string[];
  allowAfterThis?: boolean;
  allowAfterSuper?: boolean;
  allowAfterThisConstructor?: boolean;
  enforceInMethodNames?: boolean;
  allowFunctionParams?: boolean;
  enforceInClassFields?: boolean;
  allowInArrayDestructuring?: boolean;
  allowInObjectDestructuring?: boolean;
}

type NoUnderscoreDangleRuleOptions = [Schema0$V?];

type NoUnexpectedMultilineRuleOptions = [];

type NoUnmodifiedLoopConditionRuleOptions = [];

interface Schema0$U {
  defaultAssignment?: boolean;
}

type NoUnneededTernaryRuleOptions = [Schema0$U?];

type NoUnreachableRuleOptions = [];

interface Schema0$T {
  ignore?: (
    | 'WhileStatement'
    | 'DoWhileStatement'
    | 'ForStatement'
    | 'ForInStatement'
    | 'ForOfStatement'
  )[];
}

type NoUnreachableLoopRuleOptions = [Schema0$T?];

type NoUnsafeFinallyRuleOptions = [];

interface Schema0$S {
  enforceForOrderingRelations?: boolean;
}

type NoUnsafeNegationRuleOptions = [Schema0$S?];

interface Schema0$R {
  disallowArithmeticOperators?: boolean;
}

type NoUnsafeOptionalChainingRuleOptions = [Schema0$R?];

interface Schema0$Q {
  allowShortCircuit?: boolean;
  allowTernary?: boolean;
  allowTaggedTemplates?: boolean;
  enforceForJSX?: boolean;
}

type NoUnusedExpressionsRuleOptions = [Schema0$Q?];

type NoUnusedLabelsRuleOptions = [];

type NoUnusedPrivateClassMembersRuleOptions = [];

type Schema0$P =
  | ('all' | 'local')
  | {
      vars?: 'all' | 'local';
      varsIgnorePattern?: string;
      args?: 'all' | 'after-used' | 'none';
      ignoreRestSiblings?: boolean;
      argsIgnorePattern?: string;
      caughtErrors?: 'all' | 'none';
      caughtErrorsIgnorePattern?: string;
      destructuredArrayIgnorePattern?: string;
    };

type NoUnusedVarsRuleOptions = [Schema0$P?];

type Schema0$O =
  | 'nofunc'
  | {
      functions?: boolean;
      classes?: boolean;
      variables?: boolean;
      allowNamedExports?: boolean;
    };

type NoUseBeforeDefineRuleOptions = [Schema0$O?];

type NoUselessBackreferenceRuleOptions = [];

type NoUselessCallRuleOptions = [];

type NoUselessCatchRuleOptions = [];

interface Schema0$N {
  enforceForClassMembers?: boolean;
}

type NoUselessComputedKeyRuleOptions = [Schema0$N?];

type NoUselessConcatRuleOptions = [];

type NoUselessConstructorRuleOptions = [];

type NoUselessEscapeRuleOptions = [];

interface Schema0$M {
  ignoreDestructuring?: boolean;
  ignoreImport?: boolean;
  ignoreExport?: boolean;
}

type NoUselessRenameRuleOptions = [Schema0$M?];

type NoUselessReturnRuleOptions = [];

type NoVarRuleOptions = [];

interface Schema0$L {
  allowAsStatement?: boolean;
}

type NoVoidRuleOptions = [Schema0$L?];

interface Schema0$K {
  terms?: string[];
  location?: 'start' | 'anywhere';
  /**
   * @minItems 1
   */
  decoration?: [string, ...string[]];
}

type NoWarningCommentsRuleOptions = [Schema0$K?];

type NoWhitespaceBeforePropertyRuleOptions = [];

type NoWithRuleOptions = [];

type Schema0$J = 'beside' | 'below' | 'any';

interface Schema1$a {
  overrides?: {
    if?: 'beside' | 'below' | 'any';
    else?: 'beside' | 'below' | 'any';
    while?: 'beside' | 'below' | 'any';
    do?: 'beside' | 'below' | 'any';
    for?: 'beside' | 'below' | 'any';
  };
}

type NonblockStatementBodyPositionRuleOptions = [Schema0$J?, Schema1$a?];

type Schema0$I =
  | (
      | ('always' | 'never')
      | {
          multiline?: boolean;
          minProperties?: number;
          consistent?: boolean;
        }
    )
  | {
      ObjectExpression?:
        | ('always' | 'never')
        | {
            multiline?: boolean;
            minProperties?: number;
            consistent?: boolean;
          };
      ObjectPattern?:
        | ('always' | 'never')
        | {
            multiline?: boolean;
            minProperties?: number;
            consistent?: boolean;
          };
      ImportDeclaration?:
        | ('always' | 'never')
        | {
            multiline?: boolean;
            minProperties?: number;
            consistent?: boolean;
          };
      ExportDeclaration?:
        | ('always' | 'never')
        | {
            multiline?: boolean;
            minProperties?: number;
            consistent?: boolean;
          };
    };

type ObjectCurlyNewlineRuleOptions = [Schema0$I?];

type Schema0$H = 'always' | 'never';

interface Schema1$9 {
  arraysInObjects?: boolean;
  objectsInObjects?: boolean;
}

type ObjectCurlySpacingRuleOptions = [Schema0$H?, Schema1$9?];

interface Schema0$G {
  allowAllPropertiesOnSameLine?: boolean;
  allowMultiplePropertiesPerLine?: boolean;
}

type ObjectPropertyNewlineRuleOptions = [Schema0$G?];

type Schema0$F =
  | []
  | [
      | 'always'
      | 'methods'
      | 'properties'
      | 'never'
      | 'consistent'
      | 'consistent-as-needed',
    ]
  | []
  | ['always' | 'methods' | 'properties']
  | [
      'always' | 'methods' | 'properties',
      {
        avoidQuotes?: boolean;
      },
    ]
  | []
  | ['always' | 'methods']
  | [
      'always' | 'methods',
      {
        ignoreConstructors?: boolean;
        methodsIgnorePattern?: string;
        avoidQuotes?: boolean;
        avoidExplicitReturnArrows?: boolean;
      },
    ];

type ObjectShorthandRuleOptions = Schema0$F;

type Schema0$E =
  | ('always' | 'never' | 'consecutive')
  | {
      separateRequires?: boolean;
      var?: 'always' | 'never' | 'consecutive';
      let?: 'always' | 'never' | 'consecutive';
      const?: 'always' | 'never' | 'consecutive';
    }
  | {
      initialized?: 'always' | 'never' | 'consecutive';
      uninitialized?: 'always' | 'never' | 'consecutive';
    };

type OneVarRuleOptions = [Schema0$E?];

type Schema0$D = 'always' | 'initializations';

type OneVarDeclarationPerLineRuleOptions = [Schema0$D?];

type Schema0$C = 'always' | 'never';

type OperatorAssignmentRuleOptions = [Schema0$C?];

type Schema0$B = 'after' | 'before' | 'none' | null;

interface Schema1$8 {
  overrides?: {
    [k: string]: 'after' | 'before' | 'none' | 'ignore';
  };
}

type OperatorLinebreakRuleOptions = [Schema0$B?, Schema1$8?];

type Schema0$A =
  | ('always' | 'never')
  | {
      blocks?: 'always' | 'never';
      switches?: 'always' | 'never';
      classes?: 'always' | 'never';
    };

interface Schema1$7 {
  allowSingleLineBlocks?: boolean;
}

type PaddedBlocksRuleOptions = [Schema0$A?, Schema1$7?];

type PaddingType = 'any' | 'never' | 'always';
type StatementType =
  | (
      | '*'
      | 'block-like'
      | 'cjs-export'
      | 'cjs-import'
      | 'directive'
      | 'expression'
      | 'iife'
      | 'multiline-block-like'
      | 'multiline-expression'
      | 'multiline-const'
      | 'multiline-let'
      | 'multiline-var'
      | 'singleline-const'
      | 'singleline-let'
      | 'singleline-var'
      | 'block'
      | 'empty'
      | 'function'
      | 'break'
      | 'case'
      | 'class'
      | 'const'
      | 'continue'
      | 'debugger'
      | 'default'
      | 'do'
      | 'export'
      | 'for'
      | 'if'
      | 'import'
      | 'let'
      | 'return'
      | 'switch'
      | 'throw'
      | 'try'
      | 'var'
      | 'while'
      | 'with'
    )
  | [
      (
        | '*'
        | 'block-like'
        | 'cjs-export'
        | 'cjs-import'
        | 'directive'
        | 'expression'
        | 'iife'
        | 'multiline-block-like'
        | 'multiline-expression'
        | 'multiline-const'
        | 'multiline-let'
        | 'multiline-var'
        | 'singleline-const'
        | 'singleline-let'
        | 'singleline-var'
        | 'block'
        | 'empty'
        | 'function'
        | 'break'
        | 'case'
        | 'class'
        | 'const'
        | 'continue'
        | 'debugger'
        | 'default'
        | 'do'
        | 'export'
        | 'for'
        | 'if'
        | 'import'
        | 'let'
        | 'return'
        | 'switch'
        | 'throw'
        | 'try'
        | 'var'
        | 'while'
        | 'with'
      ),
      ...(
        | '*'
        | 'block-like'
        | 'cjs-export'
        | 'cjs-import'
        | 'directive'
        | 'expression'
        | 'iife'
        | 'multiline-block-like'
        | 'multiline-expression'
        | 'multiline-const'
        | 'multiline-let'
        | 'multiline-var'
        | 'singleline-const'
        | 'singleline-let'
        | 'singleline-var'
        | 'block'
        | 'empty'
        | 'function'
        | 'break'
        | 'case'
        | 'class'
        | 'const'
        | 'continue'
        | 'debugger'
        | 'default'
        | 'do'
        | 'export'
        | 'for'
        | 'if'
        | 'import'
        | 'let'
        | 'return'
        | 'switch'
        | 'throw'
        | 'try'
        | 'var'
        | 'while'
        | 'with'
      )[],
    ];
type Schema0$z = {
  blankLine: PaddingType;
  prev: StatementType;
  next: StatementType;
}[];

type PaddingLineBetweenStatementsRuleOptions = Schema0$z;

interface Schema0$y {
  allowNamedFunctions?: boolean;
  allowUnboundThis?: boolean;
}

type PreferArrowCallbackRuleOptions = [Schema0$y?];

interface Schema0$x {
  destructuring?: 'any' | 'all';
  ignoreReadBeforeAssign?: boolean;
}

type PreferConstRuleOptions = [Schema0$x?];

type Schema0$w =
  | {
      VariableDeclarator?: {
        array?: boolean;
        object?: boolean;
      };
      AssignmentExpression?: {
        array?: boolean;
        object?: boolean;
      };
    }
  | {
      array?: boolean;
      object?: boolean;
    };

interface Schema1$6 {
  enforceForRenamedProperties?: boolean;
}

type PreferDestructuringRuleOptions = [Schema0$w?, Schema1$6?];

type PreferExponentiationOperatorRuleOptions = [];

type PreferNamedCaptureGroupRuleOptions = [];

type PreferNumericLiteralsRuleOptions = [];

type PreferObjectHasOwnRuleOptions = [];

type PreferObjectSpreadRuleOptions = [];

interface Schema0$v {
  allowEmptyReject?: boolean;
}

type PreferPromiseRejectErrorsRuleOptions = [Schema0$v?];

interface Schema0$u {
  exceptions?: (
    | 'apply'
    | 'call'
    | 'delete'
    | 'defineProperty'
    | 'getOwnPropertyDescriptor'
    | 'getPrototypeOf'
    | 'setPrototypeOf'
    | 'isExtensible'
    | 'getOwnPropertyNames'
    | 'preventExtensions'
  )[];
}

type PreferReflectRuleOptions = [Schema0$u?];

interface Schema0$t {
  disallowRedundantWrapping?: boolean;
}

type PreferRegexLiteralsRuleOptions = [Schema0$t?];

type PreferRestParamsRuleOptions = [];

type PreferSpreadRuleOptions = [];

type PreferTemplateRuleOptions = [];

type Schema0$s =
  | []
  | ['always' | 'as-needed' | 'consistent' | 'consistent-as-needed']
  | []
  | ['always' | 'as-needed' | 'consistent' | 'consistent-as-needed']
  | [
      'always' | 'as-needed' | 'consistent' | 'consistent-as-needed',
      {
        keywords?: boolean;
        unnecessary?: boolean;
        numbers?: boolean;
      },
    ];

type QuotePropsRuleOptions = Schema0$s;

type Schema0$r = 'single' | 'double' | 'backtick';

type Schema1$5 =
  | 'avoid-escape'
  | {
      avoidEscape?: boolean;
      allowTemplateLiterals?: boolean;
    };

type QuotesRuleOptions = [Schema0$r?, Schema1$5?];

type Schema0$q = 'always' | 'as-needed';

type RadixRuleOptions = [Schema0$q?];

interface Schema0$p {
  allowProperties?: boolean;
}

type RequireAtomicUpdatesRuleOptions = [Schema0$p?];

type RequireAwaitRuleOptions = [];

interface Schema0$o {
  require?: {
    ClassDeclaration?: boolean;
    MethodDefinition?: boolean;
    FunctionDeclaration?: boolean;
    ArrowFunctionExpression?: boolean;
    FunctionExpression?: boolean;
  };
}

type RequireJsdocRuleOptions = [Schema0$o?];

type RequireUnicodeRegexpRuleOptions = [];

type RequireYieldRuleOptions = [];

type Schema0$n = 'always' | 'never';

type RestSpreadSpacingRuleOptions = [Schema0$n?];

type Schema0$m =
  | []
  | ['never']
  | [
      'never',
      {
        beforeStatementContinuationChars?: 'always' | 'any' | 'never';
      },
    ]
  | []
  | ['always']
  | [
      'always',
      {
        omitLastInOneLineBlock?: boolean;
        omitLastInOneLineClassBody?: boolean;
      },
    ];

type SemiRuleOptions = Schema0$m;

interface Schema0$l {
  before?: boolean;
  after?: boolean;
}

type SemiSpacingRuleOptions = [Schema0$l?];

type Schema0$k = 'last' | 'first';

type SemiStyleRuleOptions = [Schema0$k?];

interface Schema0$j {
  ignoreCase?: boolean;
  /**
   * @minItems 4
   * @maxItems 4
   */
  memberSyntaxSortOrder?: [
    'none' | 'all' | 'multiple' | 'single',
    'none' | 'all' | 'multiple' | 'single',
    'none' | 'all' | 'multiple' | 'single',
    'none' | 'all' | 'multiple' | 'single',
  ];
  ignoreDeclarationSort?: boolean;
  ignoreMemberSort?: boolean;
  allowSeparatedGroups?: boolean;
}

type SortImportsRuleOptions = [Schema0$j?];

type Schema0$i = 'asc' | 'desc';

interface Schema1$4 {
  caseSensitive?: boolean;
  natural?: boolean;
  minKeys?: number;
  allowLineSeparatedGroups?: boolean;
}

type SortKeysRuleOptions = [Schema0$i?, Schema1$4?];

interface Schema0$h {
  ignoreCase?: boolean;
}

type SortVarsRuleOptions = [Schema0$h?];

type Schema0$g =
  | ('always' | 'never')
  | {
      keywords?: 'always' | 'never' | 'off';
      functions?: 'always' | 'never' | 'off';
      classes?: 'always' | 'never' | 'off';
    };

type SpaceBeforeBlocksRuleOptions = [Schema0$g?];

type Schema0$f =
  | ('always' | 'never')
  | {
      anonymous?: 'always' | 'never' | 'ignore';
      named?: 'always' | 'never' | 'ignore';
      asyncArrow?: 'always' | 'never' | 'ignore';
    };

type SpaceBeforeFunctionParenRuleOptions = [Schema0$f?];

type Schema0$e = 'always' | 'never';

interface Schema1$3 {
  exceptions?: ('{}' | '[]' | '()' | 'empty')[];
}

type SpaceInParensRuleOptions = [Schema0$e?, Schema1$3?];

interface Schema0$d {
  int32Hint?: boolean;
}

type SpaceInfixOpsRuleOptions = [Schema0$d?];

interface Schema0$c {
  words?: boolean;
  nonwords?: boolean;
  overrides?: {
    [k: string]: boolean;
  };
}

type SpaceUnaryOpsRuleOptions = [Schema0$c?];

type Schema0$b = 'always' | 'never';

interface Schema1$2 {
  exceptions?: string[];
  markers?: string[];
  line?: {
    exceptions?: string[];
    markers?: string[];
  };
  block?: {
    exceptions?: string[];
    markers?: string[];
    balanced?: boolean;
  };
}

type SpacedCommentRuleOptions = [Schema0$b?, Schema1$2?];

type Schema0$a = 'never' | 'global' | 'function' | 'safe';

type StrictRuleOptions = [Schema0$a?];

interface Schema0$9 {
  before?: boolean;
  after?: boolean;
}

type SwitchColonSpacingRuleOptions = [Schema0$9?];

type SymbolDescriptionRuleOptions = [];

type Schema0$8 = 'always' | 'never';

type TemplateCurlySpacingRuleOptions = [Schema0$8?];

type Schema0$7 = 'always' | 'never';

type TemplateTagSpacingRuleOptions = [Schema0$7?];

type Schema0$6 = 'always' | 'never';

type UnicodeBomRuleOptions = [Schema0$6?];

interface Schema0$5 {
  enforceForSwitchCase?: boolean;
  enforceForIndexOf?: boolean;
}

type UseIsnanRuleOptions = [Schema0$5?];

interface Schema0$4 {
  prefer?: {
    [k: string]: string;
  };
  preferType?: {
    [k: string]: string;
  };
  requireReturn?: boolean;
  requireParamDescription?: boolean;
  requireReturnDescription?: boolean;
  matchDescription?: string;
  requireReturnType?: boolean;
  requireParamType?: boolean;
}

type ValidJsdocRuleOptions = [Schema0$4?];

interface Schema0$3 {
  requireStringLiterals?: boolean;
}

type ValidTypeofRuleOptions = [Schema0$3?];

type VarsOnTopRuleOptions = [];

type Schema0$2 = 'outside' | 'inside' | 'any';

interface Schema1$1 {
  functionPrototypeMethods?: boolean;
}

type WrapIifeRuleOptions = [Schema0$2?, Schema1$1?];

type WrapRegexRuleOptions = [];

type Schema0$1 =
  | ('before' | 'after' | 'both' | 'neither')
  | {
      before?: boolean;
      after?: boolean;
    };

type YieldStarSpacingRuleOptions = [Schema0$1?];

type Schema0 = 'always' | 'never';

interface Schema1 {
  exceptRange?: boolean;
  onlyEquality?: boolean;
}

type YodaRuleOptions = [Schema0?, Schema1?];

interface EslintRules {
  /**
   * Enforce getter and setter pairs in objects and classes
   *
   * @see [accessor-pairs](https://eslint.org/docs/latest/rules/accessor-pairs)
   */
  'accessor-pairs': RuleConfig<AccessorPairsRuleOptions>;
  /**
   * Enforce linebreaks after opening and before closing array brackets
   *
   * @see [array-bracket-newline](https://eslint.org/docs/latest/rules/array-bracket-newline)
   */
  'array-bracket-newline': RuleConfig<ArrayBracketNewlineRuleOptions>;
  /**
   * Enforce consistent spacing inside array brackets
   *
   * @see [array-bracket-spacing](https://eslint.org/docs/latest/rules/array-bracket-spacing)
   */
  'array-bracket-spacing': RuleConfig<ArrayBracketSpacingRuleOptions>;
  /**
   * Enforce `return` statements in callbacks of array methods
   *
   * @see [array-callback-return](https://eslint.org/docs/latest/rules/array-callback-return)
   */
  'array-callback-return': RuleConfig<ArrayCallbackReturnRuleOptions>;
  /**
   * Enforce line breaks after each array element
   *
   * @see [array-element-newline](https://eslint.org/docs/latest/rules/array-element-newline)
   */
  'array-element-newline': RuleConfig<ArrayElementNewlineRuleOptions>;
  /**
   * Require braces around arrow function bodies
   *
   * @see [arrow-body-style](https://eslint.org/docs/latest/rules/arrow-body-style)
   */
  'arrow-body-style': RuleConfig<ArrowBodyStyleRuleOptions>;
  /**
   * Require parentheses around arrow function arguments
   *
   * @see [arrow-parens](https://eslint.org/docs/latest/rules/arrow-parens)
   */
  'arrow-parens': RuleConfig<ArrowParensRuleOptions>;
  /**
   * Enforce consistent spacing before and after the arrow in arrow functions
   *
   * @see [arrow-spacing](https://eslint.org/docs/latest/rules/arrow-spacing)
   */
  'arrow-spacing': RuleConfig<ArrowSpacingRuleOptions>;
  /**
   * Enforce the use of variables within the scope they are defined
   *
   * @see [block-scoped-var](https://eslint.org/docs/latest/rules/block-scoped-var)
   */
  'block-scoped-var': RuleConfig<BlockScopedVarRuleOptions>;
  /**
   * Disallow or enforce spaces inside of blocks after opening block and before closing block
   *
   * @see [block-spacing](https://eslint.org/docs/latest/rules/block-spacing)
   */
  'block-spacing': RuleConfig<BlockSpacingRuleOptions>;
  /**
   * Enforce consistent brace style for blocks
   *
   * @see [brace-style](https://eslint.org/docs/latest/rules/brace-style)
   */
  'brace-style': RuleConfig<BraceStyleRuleOptions>;
  /**
   * Require `return` statements after callbacks
   *
   * @see [callback-return](https://eslint.org/docs/latest/rules/callback-return)
   */
  'callback-return': RuleConfig<CallbackReturnRuleOptions>;
  /**
   * Enforce camelcase naming convention
   *
   * @see [camelcase](https://eslint.org/docs/latest/rules/camelcase)
   */
  camelcase: RuleConfig<CamelcaseRuleOptions>;
  /**
   * Enforce or disallow capitalization of the first letter of a comment
   *
   * @see [capitalized-comments](https://eslint.org/docs/latest/rules/capitalized-comments)
   */
  'capitalized-comments': RuleConfig<CapitalizedCommentsRuleOptions>;
  /**
   * Enforce that class methods utilize `this`
   *
   * @see [class-methods-use-this](https://eslint.org/docs/latest/rules/class-methods-use-this)
   */
  'class-methods-use-this': RuleConfig<ClassMethodsUseThisRuleOptions>;
  /**
   * Require or disallow trailing commas
   *
   * @see [comma-dangle](https://eslint.org/docs/latest/rules/comma-dangle)
   */
  'comma-dangle': RuleConfig<CommaDangleRuleOptions>;
  /**
   * Enforce consistent spacing before and after commas
   *
   * @see [comma-spacing](https://eslint.org/docs/latest/rules/comma-spacing)
   */
  'comma-spacing': RuleConfig<CommaSpacingRuleOptions>;
  /**
   * Enforce consistent comma style
   *
   * @see [comma-style](https://eslint.org/docs/latest/rules/comma-style)
   */
  'comma-style': RuleConfig<CommaStyleRuleOptions>;
  /**
   * Enforce a maximum cyclomatic complexity allowed in a program
   *
   * @see [complexity](https://eslint.org/docs/latest/rules/complexity)
   */
  complexity: RuleConfig<ComplexityRuleOptions>;
  /**
   * Enforce consistent spacing inside computed property brackets
   *
   * @see [computed-property-spacing](https://eslint.org/docs/latest/rules/computed-property-spacing)
   */
  'computed-property-spacing': RuleConfig<ComputedPropertySpacingRuleOptions>;
  /**
   * Require `return` statements to either always or never specify values
   *
   * @see [consistent-return](https://eslint.org/docs/latest/rules/consistent-return)
   */
  'consistent-return': RuleConfig<ConsistentReturnRuleOptions>;
  /**
   * Enforce consistent naming when capturing the current execution context
   *
   * @see [consistent-this](https://eslint.org/docs/latest/rules/consistent-this)
   */
  'consistent-this': RuleConfig<ConsistentThisRuleOptions>;
  /**
   * Require `super()` calls in constructors
   *
   * @see [constructor-super](https://eslint.org/docs/latest/rules/constructor-super)
   */
  'constructor-super': RuleConfig<ConstructorSuperRuleOptions>;
  /**
   * Enforce consistent brace style for all control statements
   *
   * @see [curly](https://eslint.org/docs/latest/rules/curly)
   */
  curly: RuleConfig<CurlyRuleOptions>;
  /**
   * Require `default` cases in `switch` statements
   *
   * @see [default-case](https://eslint.org/docs/latest/rules/default-case)
   */
  'default-case': RuleConfig<DefaultCaseRuleOptions>;
  /**
   * Enforce default clauses in switch statements to be last
   *
   * @see [default-case-last](https://eslint.org/docs/latest/rules/default-case-last)
   */
  'default-case-last': RuleConfig<DefaultCaseLastRuleOptions>;
  /**
   * Enforce default parameters to be last
   *
   * @see [default-param-last](https://eslint.org/docs/latest/rules/default-param-last)
   */
  'default-param-last': RuleConfig<DefaultParamLastRuleOptions>;
  /**
   * Enforce consistent newlines before and after dots
   *
   * @see [dot-location](https://eslint.org/docs/latest/rules/dot-location)
   */
  'dot-location': RuleConfig<DotLocationRuleOptions>;
  /**
   * Enforce dot notation whenever possible
   *
   * @see [dot-notation](https://eslint.org/docs/latest/rules/dot-notation)
   */
  'dot-notation': RuleConfig<DotNotationRuleOptions>;
  /**
   * Require or disallow newline at the end of files
   *
   * @see [eol-last](https://eslint.org/docs/latest/rules/eol-last)
   */
  'eol-last': RuleConfig<EolLastRuleOptions>;
  /**
   * Require the use of `===` and `!==`
   *
   * @see [eqeqeq](https://eslint.org/docs/latest/rules/eqeqeq)
   */
  eqeqeq: RuleConfig<EqeqeqRuleOptions>;
  /**
   * Enforce "for" loop update clause moving the counter in the right direction
   *
   * @see [for-direction](https://eslint.org/docs/latest/rules/for-direction)
   */
  'for-direction': RuleConfig<ForDirectionRuleOptions>;
  /**
   * Require or disallow spacing between function identifiers and their invocations
   *
   * @see [func-call-spacing](https://eslint.org/docs/latest/rules/func-call-spacing)
   */
  'func-call-spacing': RuleConfig<FuncCallSpacingRuleOptions>;
  /**
   * Require function names to match the name of the variable or property to which they are assigned
   *
   * @see [func-name-matching](https://eslint.org/docs/latest/rules/func-name-matching)
   */
  'func-name-matching': RuleConfig<FuncNameMatchingRuleOptions>;
  /**
   * Require or disallow named `function` expressions
   *
   * @see [func-names](https://eslint.org/docs/latest/rules/func-names)
   */
  'func-names': RuleConfig<FuncNamesRuleOptions>;
  /**
   * Enforce the consistent use of either `function` declarations or expressions
   *
   * @see [func-style](https://eslint.org/docs/latest/rules/func-style)
   */
  'func-style': RuleConfig<FuncStyleRuleOptions>;
  /**
   * Enforce line breaks between arguments of a function call
   *
   * @see [function-call-argument-newline](https://eslint.org/docs/latest/rules/function-call-argument-newline)
   */
  'function-call-argument-newline': RuleConfig<FunctionCallArgumentNewlineRuleOptions>;
  /**
   * Enforce consistent line breaks inside function parentheses
   *
   * @see [function-paren-newline](https://eslint.org/docs/latest/rules/function-paren-newline)
   */
  'function-paren-newline': RuleConfig<FunctionParenNewlineRuleOptions>;
  /**
   * Enforce consistent spacing around `*` operators in generator functions
   *
   * @see [generator-star-spacing](https://eslint.org/docs/latest/rules/generator-star-spacing)
   */
  'generator-star-spacing': RuleConfig<GeneratorStarSpacingRuleOptions>;
  /**
   * Enforce `return` statements in getters
   *
   * @see [getter-return](https://eslint.org/docs/latest/rules/getter-return)
   */
  'getter-return': RuleConfig<GetterReturnRuleOptions>;
  /**
   * Require `require()` calls to be placed at top-level module scope
   *
   * @see [global-require](https://eslint.org/docs/latest/rules/global-require)
   */
  'global-require': RuleConfig<GlobalRequireRuleOptions>;
  /**
   * Require grouped accessor pairs in object literals and classes
   *
   * @see [grouped-accessor-pairs](https://eslint.org/docs/latest/rules/grouped-accessor-pairs)
   */
  'grouped-accessor-pairs': RuleConfig<GroupedAccessorPairsRuleOptions>;
  /**
   * Require `for-in` loops to include an `if` statement
   *
   * @see [guard-for-in](https://eslint.org/docs/latest/rules/guard-for-in)
   */
  'guard-for-in': RuleConfig<GuardForInRuleOptions>;
  /**
   * Require error handling in callbacks
   *
   * @see [handle-callback-err](https://eslint.org/docs/latest/rules/handle-callback-err)
   */
  'handle-callback-err': RuleConfig<HandleCallbackErrRuleOptions>;
  /**
   * Disallow specified identifiers
   *
   * @see [id-blacklist](https://eslint.org/docs/latest/rules/id-blacklist)
   */
  'id-blacklist': RuleConfig<IdBlacklistRuleOptions>;
  /**
   * Disallow specified identifiers
   *
   * @see [id-denylist](https://eslint.org/docs/latest/rules/id-denylist)
   */
  'id-denylist': RuleConfig<IdDenylistRuleOptions>;
  /**
   * Enforce minimum and maximum identifier lengths
   *
   * @see [id-length](https://eslint.org/docs/latest/rules/id-length)
   */
  'id-length': RuleConfig<IdLengthRuleOptions>;
  /**
   * Require identifiers to match a specified regular expression
   *
   * @see [id-match](https://eslint.org/docs/latest/rules/id-match)
   */
  'id-match': RuleConfig<IdMatchRuleOptions>;
  /**
   * Enforce the location of arrow function bodies
   *
   * @see [implicit-arrow-linebreak](https://eslint.org/docs/latest/rules/implicit-arrow-linebreak)
   */
  'implicit-arrow-linebreak': RuleConfig<ImplicitArrowLinebreakRuleOptions>;
  /**
   * Enforce consistent indentation
   *
   * @see [indent](https://eslint.org/docs/latest/rules/indent)
   */
  indent: RuleConfig<IndentRuleOptions>;
  /**
   * Enforce consistent indentation
   *
   * @see [indent-legacy](https://eslint.org/docs/latest/rules/indent-legacy)
   */
  'indent-legacy': RuleConfig<IndentLegacyRuleOptions>;
  /**
   * Require or disallow initialization in variable declarations
   *
   * @see [init-declarations](https://eslint.org/docs/latest/rules/init-declarations)
   */
  'init-declarations': RuleConfig<InitDeclarationsRuleOptions>;
  /**
   * Enforce the consistent use of either double or single quotes in JSX attributes
   *
   * @see [jsx-quotes](https://eslint.org/docs/latest/rules/jsx-quotes)
   */
  'jsx-quotes': RuleConfig<JsxQuotesRuleOptions>;
  /**
   * Enforce consistent spacing between keys and values in object literal properties
   *
   * @see [key-spacing](https://eslint.org/docs/latest/rules/key-spacing)
   */
  'key-spacing': RuleConfig<KeySpacingRuleOptions>;
  /**
   * Enforce consistent spacing before and after keywords
   *
   * @see [keyword-spacing](https://eslint.org/docs/latest/rules/keyword-spacing)
   */
  'keyword-spacing': RuleConfig<KeywordSpacingRuleOptions>;
  /**
   * Enforce position of line comments
   *
   * @see [line-comment-position](https://eslint.org/docs/latest/rules/line-comment-position)
   */
  'line-comment-position': RuleConfig<LineCommentPositionRuleOptions>;
  /**
   * Enforce consistent linebreak style
   *
   * @see [linebreak-style](https://eslint.org/docs/latest/rules/linebreak-style)
   */
  'linebreak-style': RuleConfig<LinebreakStyleRuleOptions>;
  /**
   * Require empty lines around comments
   *
   * @see [lines-around-comment](https://eslint.org/docs/latest/rules/lines-around-comment)
   */
  'lines-around-comment': RuleConfig<LinesAroundCommentRuleOptions>;
  /**
   * Require or disallow newlines around directives
   *
   * @see [lines-around-directive](https://eslint.org/docs/latest/rules/lines-around-directive)
   */
  'lines-around-directive': RuleConfig<LinesAroundDirectiveRuleOptions>;
  /**
   * Require or disallow an empty line between class members
   *
   * @see [lines-between-class-members](https://eslint.org/docs/latest/rules/lines-between-class-members)
   */
  'lines-between-class-members': RuleConfig<LinesBetweenClassMembersRuleOptions>;
  /**
   * Require or disallow logical assignment operator shorthand
   *
   * @see [logical-assignment-operators](https://eslint.org/docs/latest/rules/logical-assignment-operators)
   */
  'logical-assignment-operators': RuleConfig<LogicalAssignmentOperatorsRuleOptions>;
  /**
   * Enforce a maximum number of classes per file
   *
   * @see [max-classes-per-file](https://eslint.org/docs/latest/rules/max-classes-per-file)
   */
  'max-classes-per-file': RuleConfig<MaxClassesPerFileRuleOptions>;
  /**
   * Enforce a maximum depth that blocks can be nested
   *
   * @see [max-depth](https://eslint.org/docs/latest/rules/max-depth)
   */
  'max-depth': RuleConfig<MaxDepthRuleOptions>;
  /**
   * Enforce a maximum line length
   *
   * @see [max-len](https://eslint.org/docs/latest/rules/max-len)
   */
  'max-len': RuleConfig<MaxLenRuleOptions>;
  /**
   * Enforce a maximum number of lines per file
   *
   * @see [max-lines](https://eslint.org/docs/latest/rules/max-lines)
   */
  'max-lines': RuleConfig<MaxLinesRuleOptions>;
  /**
   * Enforce a maximum number of lines of code in a function
   *
   * @see [max-lines-per-function](https://eslint.org/docs/latest/rules/max-lines-per-function)
   */
  'max-lines-per-function': RuleConfig<MaxLinesPerFunctionRuleOptions>;
  /**
   * Enforce a maximum depth that callbacks can be nested
   *
   * @see [max-nested-callbacks](https://eslint.org/docs/latest/rules/max-nested-callbacks)
   */
  'max-nested-callbacks': RuleConfig<MaxNestedCallbacksRuleOptions>;
  /**
   * Enforce a maximum number of parameters in function definitions
   *
   * @see [max-params](https://eslint.org/docs/latest/rules/max-params)
   */
  'max-params': RuleConfig<MaxParamsRuleOptions>;
  /**
   * Enforce a maximum number of statements allowed in function blocks
   *
   * @see [max-statements](https://eslint.org/docs/latest/rules/max-statements)
   */
  'max-statements': RuleConfig<MaxStatementsRuleOptions>;
  /**
   * Enforce a maximum number of statements allowed per line
   *
   * @see [max-statements-per-line](https://eslint.org/docs/latest/rules/max-statements-per-line)
   */
  'max-statements-per-line': RuleConfig<MaxStatementsPerLineRuleOptions>;
  /**
   * Enforce a particular style for multiline comments
   *
   * @see [multiline-comment-style](https://eslint.org/docs/latest/rules/multiline-comment-style)
   */
  'multiline-comment-style': RuleConfig<MultilineCommentStyleRuleOptions>;
  /**
   * Enforce newlines between operands of ternary expressions
   *
   * @see [multiline-ternary](https://eslint.org/docs/latest/rules/multiline-ternary)
   */
  'multiline-ternary': RuleConfig<MultilineTernaryRuleOptions>;
  /**
   * Require constructor names to begin with a capital letter
   *
   * @see [new-cap](https://eslint.org/docs/latest/rules/new-cap)
   */
  'new-cap': RuleConfig<NewCapRuleOptions>;
  /**
   * Enforce or disallow parentheses when invoking a constructor with no arguments
   *
   * @see [new-parens](https://eslint.org/docs/latest/rules/new-parens)
   */
  'new-parens': RuleConfig<NewParensRuleOptions>;
  /**
   * Require or disallow an empty line after variable declarations
   *
   * @see [newline-after-var](https://eslint.org/docs/latest/rules/newline-after-var)
   */
  'newline-after-var': RuleConfig<NewlineAfterVarRuleOptions>;
  /**
   * Require an empty line before `return` statements
   *
   * @see [newline-before-return](https://eslint.org/docs/latest/rules/newline-before-return)
   */
  'newline-before-return': RuleConfig<NewlineBeforeReturnRuleOptions>;
  /**
   * Require a newline after each call in a method chain
   *
   * @see [newline-per-chained-call](https://eslint.org/docs/latest/rules/newline-per-chained-call)
   */
  'newline-per-chained-call': RuleConfig<NewlinePerChainedCallRuleOptions>;
  /**
   * Disallow the use of `alert`, `confirm`, and `prompt`
   *
   * @see [no-alert](https://eslint.org/docs/latest/rules/no-alert)
   */
  'no-alert': RuleConfig<NoAlertRuleOptions>;
  /**
   * Disallow `Array` constructors
   *
   * @see [no-array-constructor](https://eslint.org/docs/latest/rules/no-array-constructor)
   */
  'no-array-constructor': RuleConfig<NoArrayConstructorRuleOptions>;
  /**
   * Disallow using an async function as a Promise executor
   *
   * @see [no-async-promise-executor](https://eslint.org/docs/latest/rules/no-async-promise-executor)
   */
  'no-async-promise-executor': RuleConfig<NoAsyncPromiseExecutorRuleOptions>;
  /**
   * Disallow `await` inside of loops
   *
   * @see [no-await-in-loop](https://eslint.org/docs/latest/rules/no-await-in-loop)
   */
  'no-await-in-loop': RuleConfig<NoAwaitInLoopRuleOptions>;
  /**
   * Disallow bitwise operators
   *
   * @see [no-bitwise](https://eslint.org/docs/latest/rules/no-bitwise)
   */
  'no-bitwise': RuleConfig<NoBitwiseRuleOptions>;
  /**
   * Disallow use of the `Buffer()` constructor
   *
   * @see [no-buffer-constructor](https://eslint.org/docs/latest/rules/no-buffer-constructor)
   */
  'no-buffer-constructor': RuleConfig<NoBufferConstructorRuleOptions>;
  /**
   * Disallow the use of `arguments.caller` or `arguments.callee`
   *
   * @see [no-caller](https://eslint.org/docs/latest/rules/no-caller)
   */
  'no-caller': RuleConfig<NoCallerRuleOptions>;
  /**
   * Disallow lexical declarations in case clauses
   *
   * @see [no-case-declarations](https://eslint.org/docs/latest/rules/no-case-declarations)
   */
  'no-case-declarations': RuleConfig<NoCaseDeclarationsRuleOptions>;
  /**
   * Disallow `catch` clause parameters from shadowing variables in the outer scope
   *
   * @see [no-catch-shadow](https://eslint.org/docs/latest/rules/no-catch-shadow)
   */
  'no-catch-shadow': RuleConfig<NoCatchShadowRuleOptions>;
  /**
   * Disallow reassigning class members
   *
   * @see [no-class-assign](https://eslint.org/docs/latest/rules/no-class-assign)
   */
  'no-class-assign': RuleConfig<NoClassAssignRuleOptions>;
  /**
   * Disallow comparing against -0
   *
   * @see [no-compare-neg-zero](https://eslint.org/docs/latest/rules/no-compare-neg-zero)
   */
  'no-compare-neg-zero': RuleConfig<NoCompareNegZeroRuleOptions>;
  /**
   * Disallow assignment operators in conditional expressions
   *
   * @see [no-cond-assign](https://eslint.org/docs/latest/rules/no-cond-assign)
   */
  'no-cond-assign': RuleConfig<NoCondAssignRuleOptions>;
  /**
   * Disallow arrow functions where they could be confused with comparisons
   *
   * @see [no-confusing-arrow](https://eslint.org/docs/latest/rules/no-confusing-arrow)
   */
  'no-confusing-arrow': RuleConfig<NoConfusingArrowRuleOptions>;
  /**
   * Disallow the use of `console`
   *
   * @see [no-console](https://eslint.org/docs/latest/rules/no-console)
   */
  'no-console': RuleConfig<NoConsoleRuleOptions>;
  /**
   * Disallow reassigning `const` variables
   *
   * @see [no-const-assign](https://eslint.org/docs/latest/rules/no-const-assign)
   */
  'no-const-assign': RuleConfig<NoConstAssignRuleOptions>;
  /**
   * Disallow expressions where the operation doesn't affect the value
   *
   * @see [no-constant-binary-expression](https://eslint.org/docs/latest/rules/no-constant-binary-expression)
   */
  'no-constant-binary-expression': RuleConfig<NoConstantBinaryExpressionRuleOptions>;
  /**
   * Disallow constant expressions in conditions
   *
   * @see [no-constant-condition](https://eslint.org/docs/latest/rules/no-constant-condition)
   */
  'no-constant-condition': RuleConfig<NoConstantConditionRuleOptions>;
  /**
   * Disallow returning value from constructor
   *
   * @see [no-constructor-return](https://eslint.org/docs/latest/rules/no-constructor-return)
   */
  'no-constructor-return': RuleConfig<NoConstructorReturnRuleOptions>;
  /**
   * Disallow `continue` statements
   *
   * @see [no-continue](https://eslint.org/docs/latest/rules/no-continue)
   */
  'no-continue': RuleConfig<NoContinueRuleOptions>;
  /**
   * Disallow control characters in regular expressions
   *
   * @see [no-control-regex](https://eslint.org/docs/latest/rules/no-control-regex)
   */
  'no-control-regex': RuleConfig<NoControlRegexRuleOptions>;
  /**
   * Disallow the use of `debugger`
   *
   * @see [no-debugger](https://eslint.org/docs/latest/rules/no-debugger)
   */
  'no-debugger': RuleConfig<NoDebuggerRuleOptions>;
  /**
   * Disallow deleting variables
   *
   * @see [no-delete-var](https://eslint.org/docs/latest/rules/no-delete-var)
   */
  'no-delete-var': RuleConfig<NoDeleteVarRuleOptions>;
  /**
   * Disallow equal signs explicitly at the beginning of regular expressions
   *
   * @see [no-div-regex](https://eslint.org/docs/latest/rules/no-div-regex)
   */
  'no-div-regex': RuleConfig<NoDivRegexRuleOptions>;
  /**
   * Disallow duplicate arguments in `function` definitions
   *
   * @see [no-dupe-args](https://eslint.org/docs/latest/rules/no-dupe-args)
   */
  'no-dupe-args': RuleConfig<NoDupeArgsRuleOptions>;
  /**
   * Disallow duplicate class members
   *
   * @see [no-dupe-class-members](https://eslint.org/docs/latest/rules/no-dupe-class-members)
   */
  'no-dupe-class-members': RuleConfig<NoDupeClassMembersRuleOptions>;
  /**
   * Disallow duplicate conditions in if-else-if chains
   *
   * @see [no-dupe-else-if](https://eslint.org/docs/latest/rules/no-dupe-else-if)
   */
  'no-dupe-else-if': RuleConfig<NoDupeElseIfRuleOptions>;
  /**
   * Disallow duplicate keys in object literals
   *
   * @see [no-dupe-keys](https://eslint.org/docs/latest/rules/no-dupe-keys)
   */
  'no-dupe-keys': RuleConfig<NoDupeKeysRuleOptions>;
  /**
   * Disallow duplicate case labels
   *
   * @see [no-duplicate-case](https://eslint.org/docs/latest/rules/no-duplicate-case)
   */
  'no-duplicate-case': RuleConfig<NoDuplicateCaseRuleOptions>;
  /**
   * Disallow duplicate module imports
   *
   * @see [no-duplicate-imports](https://eslint.org/docs/latest/rules/no-duplicate-imports)
   */
  'no-duplicate-imports': RuleConfig<NoDuplicateImportsRuleOptions>;
  /**
   * Disallow `else` blocks after `return` statements in `if` statements
   *
   * @see [no-else-return](https://eslint.org/docs/latest/rules/no-else-return)
   */
  'no-else-return': RuleConfig<NoElseReturnRuleOptions>;
  /**
   * Disallow empty block statements
   *
   * @see [no-empty](https://eslint.org/docs/latest/rules/no-empty)
   */
  'no-empty': RuleConfig<NoEmptyRuleOptions>;
  /**
   * Disallow empty character classes in regular expressions
   *
   * @see [no-empty-character-class](https://eslint.org/docs/latest/rules/no-empty-character-class)
   */
  'no-empty-character-class': RuleConfig<NoEmptyCharacterClassRuleOptions>;
  /**
   * Disallow empty functions
   *
   * @see [no-empty-function](https://eslint.org/docs/latest/rules/no-empty-function)
   */
  'no-empty-function': RuleConfig<NoEmptyFunctionRuleOptions>;
  /**
   * Disallow empty destructuring patterns
   *
   * @see [no-empty-pattern](https://eslint.org/docs/latest/rules/no-empty-pattern)
   */
  'no-empty-pattern': RuleConfig<NoEmptyPatternRuleOptions>;
  /**
   * Disallow empty static blocks
   *
   * @see [no-empty-static-block](https://eslint.org/docs/latest/rules/no-empty-static-block)
   */
  'no-empty-static-block': RuleConfig<NoEmptyStaticBlockRuleOptions>;
  /**
   * Disallow `null` comparisons without type-checking operators
   *
   * @see [no-eq-null](https://eslint.org/docs/latest/rules/no-eq-null)
   */
  'no-eq-null': RuleConfig<NoEqNullRuleOptions>;
  /**
   * Disallow the use of `eval()`
   *
   * @see [no-eval](https://eslint.org/docs/latest/rules/no-eval)
   */
  'no-eval': RuleConfig<NoEvalRuleOptions>;
  /**
   * Disallow reassigning exceptions in `catch` clauses
   *
   * @see [no-ex-assign](https://eslint.org/docs/latest/rules/no-ex-assign)
   */
  'no-ex-assign': RuleConfig<NoExAssignRuleOptions>;
  /**
   * Disallow extending native types
   *
   * @see [no-extend-native](https://eslint.org/docs/latest/rules/no-extend-native)
   */
  'no-extend-native': RuleConfig<NoExtendNativeRuleOptions>;
  /**
   * Disallow unnecessary calls to `.bind()`
   *
   * @see [no-extra-bind](https://eslint.org/docs/latest/rules/no-extra-bind)
   */
  'no-extra-bind': RuleConfig<NoExtraBindRuleOptions>;
  /**
   * Disallow unnecessary boolean casts
   *
   * @see [no-extra-boolean-cast](https://eslint.org/docs/latest/rules/no-extra-boolean-cast)
   */
  'no-extra-boolean-cast': RuleConfig<NoExtraBooleanCastRuleOptions>;
  /**
   * Disallow unnecessary labels
   *
   * @see [no-extra-label](https://eslint.org/docs/latest/rules/no-extra-label)
   */
  'no-extra-label': RuleConfig<NoExtraLabelRuleOptions>;
  /**
   * Disallow unnecessary parentheses
   *
   * @see [no-extra-parens](https://eslint.org/docs/latest/rules/no-extra-parens)
   */
  'no-extra-parens': RuleConfig<NoExtraParensRuleOptions>;
  /**
   * Disallow unnecessary semicolons
   *
   * @see [no-extra-semi](https://eslint.org/docs/latest/rules/no-extra-semi)
   */
  'no-extra-semi': RuleConfig<NoExtraSemiRuleOptions>;
  /**
   * Disallow fallthrough of `case` statements
   *
   * @see [no-fallthrough](https://eslint.org/docs/latest/rules/no-fallthrough)
   */
  'no-fallthrough': RuleConfig<NoFallthroughRuleOptions>;
  /**
   * Disallow leading or trailing decimal points in numeric literals
   *
   * @see [no-floating-decimal](https://eslint.org/docs/latest/rules/no-floating-decimal)
   */
  'no-floating-decimal': RuleConfig<NoFloatingDecimalRuleOptions>;
  /**
   * Disallow reassigning `function` declarations
   *
   * @see [no-func-assign](https://eslint.org/docs/latest/rules/no-func-assign)
   */
  'no-func-assign': RuleConfig<NoFuncAssignRuleOptions>;
  /**
   * Disallow assignments to native objects or read-only global variables
   *
   * @see [no-global-assign](https://eslint.org/docs/latest/rules/no-global-assign)
   */
  'no-global-assign': RuleConfig<NoGlobalAssignRuleOptions>;
  /**
   * Disallow shorthand type conversions
   *
   * @see [no-implicit-coercion](https://eslint.org/docs/latest/rules/no-implicit-coercion)
   */
  'no-implicit-coercion': RuleConfig<NoImplicitCoercionRuleOptions>;
  /**
   * Disallow declarations in the global scope
   *
   * @see [no-implicit-globals](https://eslint.org/docs/latest/rules/no-implicit-globals)
   */
  'no-implicit-globals': RuleConfig<NoImplicitGlobalsRuleOptions>;
  /**
   * Disallow the use of `eval()`-like methods
   *
   * @see [no-implied-eval](https://eslint.org/docs/latest/rules/no-implied-eval)
   */
  'no-implied-eval': RuleConfig<NoImpliedEvalRuleOptions>;
  /**
   * Disallow assigning to imported bindings
   *
   * @see [no-import-assign](https://eslint.org/docs/latest/rules/no-import-assign)
   */
  'no-import-assign': RuleConfig<NoImportAssignRuleOptions>;
  /**
   * Disallow inline comments after code
   *
   * @see [no-inline-comments](https://eslint.org/docs/latest/rules/no-inline-comments)
   */
  'no-inline-comments': RuleConfig<NoInlineCommentsRuleOptions>;
  /**
   * Disallow variable or `function` declarations in nested blocks
   *
   * @see [no-inner-declarations](https://eslint.org/docs/latest/rules/no-inner-declarations)
   */
  'no-inner-declarations': RuleConfig<NoInnerDeclarationsRuleOptions>;
  /**
   * Disallow invalid regular expression strings in `RegExp` constructors
   *
   * @see [no-invalid-regexp](https://eslint.org/docs/latest/rules/no-invalid-regexp)
   */
  'no-invalid-regexp': RuleConfig<NoInvalidRegexpRuleOptions>;
  /**
   * Disallow use of `this` in contexts where the value of `this` is `undefined`
   *
   * @see [no-invalid-this](https://eslint.org/docs/latest/rules/no-invalid-this)
   */
  'no-invalid-this': RuleConfig<NoInvalidThisRuleOptions>;
  /**
   * Disallow irregular whitespace
   *
   * @see [no-irregular-whitespace](https://eslint.org/docs/latest/rules/no-irregular-whitespace)
   */
  'no-irregular-whitespace': RuleConfig<NoIrregularWhitespaceRuleOptions>;
  /**
   * Disallow the use of the `__iterator__` property
   *
   * @see [no-iterator](https://eslint.org/docs/latest/rules/no-iterator)
   */
  'no-iterator': RuleConfig<NoIteratorRuleOptions>;
  /**
   * Disallow labels that share a name with a variable
   *
   * @see [no-label-var](https://eslint.org/docs/latest/rules/no-label-var)
   */
  'no-label-var': RuleConfig<NoLabelVarRuleOptions>;
  /**
   * Disallow labeled statements
   *
   * @see [no-labels](https://eslint.org/docs/latest/rules/no-labels)
   */
  'no-labels': RuleConfig<NoLabelsRuleOptions>;
  /**
   * Disallow unnecessary nested blocks
   *
   * @see [no-lone-blocks](https://eslint.org/docs/latest/rules/no-lone-blocks)
   */
  'no-lone-blocks': RuleConfig<NoLoneBlocksRuleOptions>;
  /**
   * Disallow `if` statements as the only statement in `else` blocks
   *
   * @see [no-lonely-if](https://eslint.org/docs/latest/rules/no-lonely-if)
   */
  'no-lonely-if': RuleConfig<NoLonelyIfRuleOptions>;
  /**
   * Disallow function declarations that contain unsafe references inside loop statements
   *
   * @see [no-loop-func](https://eslint.org/docs/latest/rules/no-loop-func)
   */
  'no-loop-func': RuleConfig<NoLoopFuncRuleOptions>;
  /**
   * Disallow literal numbers that lose precision
   *
   * @see [no-loss-of-precision](https://eslint.org/docs/latest/rules/no-loss-of-precision)
   */
  'no-loss-of-precision': RuleConfig<NoLossOfPrecisionRuleOptions>;
  /**
   * Disallow magic numbers
   *
   * @see [no-magic-numbers](https://eslint.org/docs/latest/rules/no-magic-numbers)
   */
  'no-magic-numbers': RuleConfig<NoMagicNumbersRuleOptions>;
  /**
   * Disallow characters which are made with multiple code points in character class syntax
   *
   * @see [no-misleading-character-class](https://eslint.org/docs/latest/rules/no-misleading-character-class)
   */
  'no-misleading-character-class': RuleConfig<NoMisleadingCharacterClassRuleOptions>;
  /**
   * Disallow mixed binary operators
   *
   * @see [no-mixed-operators](https://eslint.org/docs/latest/rules/no-mixed-operators)
   */
  'no-mixed-operators': RuleConfig<NoMixedOperatorsRuleOptions>;
  /**
   * Disallow `require` calls to be mixed with regular variable declarations
   *
   * @see [no-mixed-requires](https://eslint.org/docs/latest/rules/no-mixed-requires)
   */
  'no-mixed-requires': RuleConfig<NoMixedRequiresRuleOptions>;
  /**
   * Disallow mixed spaces and tabs for indentation
   *
   * @see [no-mixed-spaces-and-tabs](https://eslint.org/docs/latest/rules/no-mixed-spaces-and-tabs)
   */
  'no-mixed-spaces-and-tabs': RuleConfig<NoMixedSpacesAndTabsRuleOptions>;
  /**
   * Disallow use of chained assignment expressions
   *
   * @see [no-multi-assign](https://eslint.org/docs/latest/rules/no-multi-assign)
   */
  'no-multi-assign': RuleConfig<NoMultiAssignRuleOptions>;
  /**
   * Disallow multiple spaces
   *
   * @see [no-multi-spaces](https://eslint.org/docs/latest/rules/no-multi-spaces)
   */
  'no-multi-spaces': RuleConfig<NoMultiSpacesRuleOptions>;
  /**
   * Disallow multiline strings
   *
   * @see [no-multi-str](https://eslint.org/docs/latest/rules/no-multi-str)
   */
  'no-multi-str': RuleConfig<NoMultiStrRuleOptions>;
  /**
   * Disallow multiple empty lines
   *
   * @see [no-multiple-empty-lines](https://eslint.org/docs/latest/rules/no-multiple-empty-lines)
   */
  'no-multiple-empty-lines': RuleConfig<NoMultipleEmptyLinesRuleOptions>;
  /**
   * Disallow assignments to native objects or read-only global variables
   *
   * @see [no-native-reassign](https://eslint.org/docs/latest/rules/no-native-reassign)
   */
  'no-native-reassign': RuleConfig<NoNativeReassignRuleOptions>;
  /**
   * Disallow negated conditions
   *
   * @see [no-negated-condition](https://eslint.org/docs/latest/rules/no-negated-condition)
   */
  'no-negated-condition': RuleConfig<NoNegatedConditionRuleOptions>;
  /**
   * Disallow negating the left operand in `in` expressions
   *
   * @see [no-negated-in-lhs](https://eslint.org/docs/latest/rules/no-negated-in-lhs)
   */
  'no-negated-in-lhs': RuleConfig<NoNegatedInLhsRuleOptions>;
  /**
   * Disallow nested ternary expressions
   *
   * @see [no-nested-ternary](https://eslint.org/docs/latest/rules/no-nested-ternary)
   */
  'no-nested-ternary': RuleConfig<NoNestedTernaryRuleOptions>;
  /**
   * Disallow `new` operators outside of assignments or comparisons
   *
   * @see [no-new](https://eslint.org/docs/latest/rules/no-new)
   */
  'no-new': RuleConfig<NoNewRuleOptions>;
  /**
   * Disallow `new` operators with the `Function` object
   *
   * @see [no-new-func](https://eslint.org/docs/latest/rules/no-new-func)
   */
  'no-new-func': RuleConfig<NoNewFuncRuleOptions>;
  /**
   * Disallow `new` operators with global non-constructor functions
   *
   * @see [no-new-native-nonconstructor](https://eslint.org/docs/latest/rules/no-new-native-nonconstructor)
   */
  'no-new-native-nonconstructor': RuleConfig<NoNewNativeNonconstructorRuleOptions>;
  /**
   * Disallow `Object` constructors
   *
   * @see [no-new-object](https://eslint.org/docs/latest/rules/no-new-object)
   */
  'no-new-object': RuleConfig<NoNewObjectRuleOptions>;
  /**
   * Disallow `new` operators with calls to `require`
   *
   * @see [no-new-require](https://eslint.org/docs/latest/rules/no-new-require)
   */
  'no-new-require': RuleConfig<NoNewRequireRuleOptions>;
  /**
   * Disallow `new` operators with the `Symbol` object
   *
   * @see [no-new-symbol](https://eslint.org/docs/latest/rules/no-new-symbol)
   */
  'no-new-symbol': RuleConfig<NoNewSymbolRuleOptions>;
  /**
   * Disallow `new` operators with the `String`, `Number`, and `Boolean` objects
   *
   * @see [no-new-wrappers](https://eslint.org/docs/latest/rules/no-new-wrappers)
   */
  'no-new-wrappers': RuleConfig<NoNewWrappersRuleOptions>;
  /**
   * Disallow `\8` and `\9` escape sequences in string literals
   *
   * @see [no-nonoctal-decimal-escape](https://eslint.org/docs/latest/rules/no-nonoctal-decimal-escape)
   */
  'no-nonoctal-decimal-escape': RuleConfig<NoNonoctalDecimalEscapeRuleOptions>;
  /**
   * Disallow calling global object properties as functions
   *
   * @see [no-obj-calls](https://eslint.org/docs/latest/rules/no-obj-calls)
   */
  'no-obj-calls': RuleConfig<NoObjCallsRuleOptions>;
  /**
   * Disallow calls to the `Object` constructor without an argument
   *
   * @see [no-object-constructor](https://eslint.org/docs/latest/rules/no-object-constructor)
   */
  'no-object-constructor': RuleConfig<NoObjectConstructorRuleOptions>;
  /**
   * Disallow octal literals
   *
   * @see [no-octal](https://eslint.org/docs/latest/rules/no-octal)
   */
  'no-octal': RuleConfig<NoOctalRuleOptions>;
  /**
   * Disallow octal escape sequences in string literals
   *
   * @see [no-octal-escape](https://eslint.org/docs/latest/rules/no-octal-escape)
   */
  'no-octal-escape': RuleConfig<NoOctalEscapeRuleOptions>;
  /**
   * Disallow reassigning `function` parameters
   *
   * @see [no-param-reassign](https://eslint.org/docs/latest/rules/no-param-reassign)
   */
  'no-param-reassign': RuleConfig<NoParamReassignRuleOptions>;
  /**
   * Disallow string concatenation with `__dirname` and `__filename`
   *
   * @see [no-path-concat](https://eslint.org/docs/latest/rules/no-path-concat)
   */
  'no-path-concat': RuleConfig<NoPathConcatRuleOptions>;
  /**
   * Disallow the unary operators `++` and `--`
   *
   * @see [no-plusplus](https://eslint.org/docs/latest/rules/no-plusplus)
   */
  'no-plusplus': RuleConfig<NoPlusplusRuleOptions>;
  /**
   * Disallow the use of `process.env`
   *
   * @see [no-process-env](https://eslint.org/docs/latest/rules/no-process-env)
   */
  'no-process-env': RuleConfig<NoProcessEnvRuleOptions>;
  /**
   * Disallow the use of `process.exit()`
   *
   * @see [no-process-exit](https://eslint.org/docs/latest/rules/no-process-exit)
   */
  'no-process-exit': RuleConfig<NoProcessExitRuleOptions>;
  /**
   * Disallow returning values from Promise executor functions
   *
   * @see [no-promise-executor-return](https://eslint.org/docs/latest/rules/no-promise-executor-return)
   */
  'no-promise-executor-return': RuleConfig<NoPromiseExecutorReturnRuleOptions>;
  /**
   * Disallow the use of the `__proto__` property
   *
   * @see [no-proto](https://eslint.org/docs/latest/rules/no-proto)
   */
  'no-proto': RuleConfig<NoProtoRuleOptions>;
  /**
   * Disallow calling some `Object.prototype` methods directly on objects
   *
   * @see [no-prototype-builtins](https://eslint.org/docs/latest/rules/no-prototype-builtins)
   */
  'no-prototype-builtins': RuleConfig<NoPrototypeBuiltinsRuleOptions>;
  /**
   * Disallow variable redeclaration
   *
   * @see [no-redeclare](https://eslint.org/docs/latest/rules/no-redeclare)
   */
  'no-redeclare': RuleConfig<NoRedeclareRuleOptions>;
  /**
   * Disallow multiple spaces in regular expressions
   *
   * @see [no-regex-spaces](https://eslint.org/docs/latest/rules/no-regex-spaces)
   */
  'no-regex-spaces': RuleConfig<NoRegexSpacesRuleOptions>;
  /**
   * Disallow specified names in exports
   *
   * @see [no-restricted-exports](https://eslint.org/docs/latest/rules/no-restricted-exports)
   */
  'no-restricted-exports': RuleConfig<NoRestrictedExportsRuleOptions>;
  /**
   * Disallow specified global variables
   *
   * @see [no-restricted-globals](https://eslint.org/docs/latest/rules/no-restricted-globals)
   */
  'no-restricted-globals': RuleConfig<NoRestrictedGlobalsRuleOptions>;
  /**
   * Disallow specified modules when loaded by `import`
   *
   * @see [no-restricted-imports](https://eslint.org/docs/latest/rules/no-restricted-imports)
   */
  'no-restricted-imports': RuleConfig<NoRestrictedImportsRuleOptions>;
  /**
   * Disallow specified modules when loaded by `require`
   *
   * @see [no-restricted-modules](https://eslint.org/docs/latest/rules/no-restricted-modules)
   */
  'no-restricted-modules': RuleConfig<NoRestrictedModulesRuleOptions>;
  /**
   * Disallow certain properties on certain objects
   *
   * @see [no-restricted-properties](https://eslint.org/docs/latest/rules/no-restricted-properties)
   */
  'no-restricted-properties': RuleConfig<NoRestrictedPropertiesRuleOptions>;
  /**
   * Disallow specified syntax
   *
   * @see [no-restricted-syntax](https://eslint.org/docs/latest/rules/no-restricted-syntax)
   */
  'no-restricted-syntax': RuleConfig<NoRestrictedSyntaxRuleOptions>;
  /**
   * Disallow assignment operators in `return` statements
   *
   * @see [no-return-assign](https://eslint.org/docs/latest/rules/no-return-assign)
   */
  'no-return-assign': RuleConfig<NoReturnAssignRuleOptions>;
  /**
   * Disallow unnecessary `return await`
   *
   * @see [no-return-await](https://eslint.org/docs/latest/rules/no-return-await)
   */
  'no-return-await': RuleConfig<NoReturnAwaitRuleOptions>;
  /**
   * Disallow `javascript:` urls
   *
   * @see [no-script-url](https://eslint.org/docs/latest/rules/no-script-url)
   */
  'no-script-url': RuleConfig<NoScriptUrlRuleOptions>;
  /**
   * Disallow assignments where both sides are exactly the same
   *
   * @see [no-self-assign](https://eslint.org/docs/latest/rules/no-self-assign)
   */
  'no-self-assign': RuleConfig<NoSelfAssignRuleOptions>;
  /**
   * Disallow comparisons where both sides are exactly the same
   *
   * @see [no-self-compare](https://eslint.org/docs/latest/rules/no-self-compare)
   */
  'no-self-compare': RuleConfig<NoSelfCompareRuleOptions>;
  /**
   * Disallow comma operators
   *
   * @see [no-sequences](https://eslint.org/docs/latest/rules/no-sequences)
   */
  'no-sequences': RuleConfig<NoSequencesRuleOptions>;
  /**
   * Disallow returning values from setters
   *
   * @see [no-setter-return](https://eslint.org/docs/latest/rules/no-setter-return)
   */
  'no-setter-return': RuleConfig<NoSetterReturnRuleOptions>;
  /**
   * Disallow variable declarations from shadowing variables declared in the outer scope
   *
   * @see [no-shadow](https://eslint.org/docs/latest/rules/no-shadow)
   */
  'no-shadow': RuleConfig<NoShadowRuleOptions>;
  /**
   * Disallow identifiers from shadowing restricted names
   *
   * @see [no-shadow-restricted-names](https://eslint.org/docs/latest/rules/no-shadow-restricted-names)
   */
  'no-shadow-restricted-names': RuleConfig<NoShadowRestrictedNamesRuleOptions>;
  /**
   * Disallow spacing between function identifiers and their applications (deprecated)
   *
   * @see [no-spaced-func](https://eslint.org/docs/latest/rules/no-spaced-func)
   */
  'no-spaced-func': RuleConfig<NoSpacedFuncRuleOptions>;
  /**
   * Disallow sparse arrays
   *
   * @see [no-sparse-arrays](https://eslint.org/docs/latest/rules/no-sparse-arrays)
   */
  'no-sparse-arrays': RuleConfig<NoSparseArraysRuleOptions>;
  /**
   * Disallow synchronous methods
   *
   * @see [no-sync](https://eslint.org/docs/latest/rules/no-sync)
   */
  'no-sync': RuleConfig<NoSyncRuleOptions>;
  /**
   * Disallow all tabs
   *
   * @see [no-tabs](https://eslint.org/docs/latest/rules/no-tabs)
   */
  'no-tabs': RuleConfig<NoTabsRuleOptions>;
  /**
   * Disallow template literal placeholder syntax in regular strings
   *
   * @see [no-template-curly-in-string](https://eslint.org/docs/latest/rules/no-template-curly-in-string)
   */
  'no-template-curly-in-string': RuleConfig<NoTemplateCurlyInStringRuleOptions>;
  /**
   * Disallow ternary operators
   *
   * @see [no-ternary](https://eslint.org/docs/latest/rules/no-ternary)
   */
  'no-ternary': RuleConfig<NoTernaryRuleOptions>;
  /**
   * Disallow `this`/`super` before calling `super()` in constructors
   *
   * @see [no-this-before-super](https://eslint.org/docs/latest/rules/no-this-before-super)
   */
  'no-this-before-super': RuleConfig<NoThisBeforeSuperRuleOptions>;
  /**
   * Disallow throwing literals as exceptions
   *
   * @see [no-throw-literal](https://eslint.org/docs/latest/rules/no-throw-literal)
   */
  'no-throw-literal': RuleConfig<NoThrowLiteralRuleOptions>;
  /**
   * Disallow trailing whitespace at the end of lines
   *
   * @see [no-trailing-spaces](https://eslint.org/docs/latest/rules/no-trailing-spaces)
   */
  'no-trailing-spaces': RuleConfig<NoTrailingSpacesRuleOptions>;
  /**
   * Disallow the use of undeclared variables unless mentioned in `/*global *\/` comments
   *
   * @see [no-undef](https://eslint.org/docs/latest/rules/no-undef)
   */
  'no-undef': RuleConfig<NoUndefRuleOptions>;
  /**
   * Disallow initializing variables to `undefined`
   *
   * @see [no-undef-init](https://eslint.org/docs/latest/rules/no-undef-init)
   */
  'no-undef-init': RuleConfig<NoUndefInitRuleOptions>;
  /**
   * Disallow the use of `undefined` as an identifier
   *
   * @see [no-undefined](https://eslint.org/docs/latest/rules/no-undefined)
   */
  'no-undefined': RuleConfig<NoUndefinedRuleOptions>;
  /**
   * Disallow dangling underscores in identifiers
   *
   * @see [no-underscore-dangle](https://eslint.org/docs/latest/rules/no-underscore-dangle)
   */
  'no-underscore-dangle': RuleConfig<NoUnderscoreDangleRuleOptions>;
  /**
   * Disallow confusing multiline expressions
   *
   * @see [no-unexpected-multiline](https://eslint.org/docs/latest/rules/no-unexpected-multiline)
   */
  'no-unexpected-multiline': RuleConfig<NoUnexpectedMultilineRuleOptions>;
  /**
   * Disallow unmodified loop conditions
   *
   * @see [no-unmodified-loop-condition](https://eslint.org/docs/latest/rules/no-unmodified-loop-condition)
   */
  'no-unmodified-loop-condition': RuleConfig<NoUnmodifiedLoopConditionRuleOptions>;
  /**
   * Disallow ternary operators when simpler alternatives exist
   *
   * @see [no-unneeded-ternary](https://eslint.org/docs/latest/rules/no-unneeded-ternary)
   */
  'no-unneeded-ternary': RuleConfig<NoUnneededTernaryRuleOptions>;
  /**
   * Disallow unreachable code after `return`, `throw`, `continue`, and `break` statements
   *
   * @see [no-unreachable](https://eslint.org/docs/latest/rules/no-unreachable)
   */
  'no-unreachable': RuleConfig<NoUnreachableRuleOptions>;
  /**
   * Disallow loops with a body that allows only one iteration
   *
   * @see [no-unreachable-loop](https://eslint.org/docs/latest/rules/no-unreachable-loop)
   */
  'no-unreachable-loop': RuleConfig<NoUnreachableLoopRuleOptions>;
  /**
   * Disallow control flow statements in `finally` blocks
   *
   * @see [no-unsafe-finally](https://eslint.org/docs/latest/rules/no-unsafe-finally)
   */
  'no-unsafe-finally': RuleConfig<NoUnsafeFinallyRuleOptions>;
  /**
   * Disallow negating the left operand of relational operators
   *
   * @see [no-unsafe-negation](https://eslint.org/docs/latest/rules/no-unsafe-negation)
   */
  'no-unsafe-negation': RuleConfig<NoUnsafeNegationRuleOptions>;
  /**
   * Disallow use of optional chaining in contexts where the `undefined` value is not allowed
   *
   * @see [no-unsafe-optional-chaining](https://eslint.org/docs/latest/rules/no-unsafe-optional-chaining)
   */
  'no-unsafe-optional-chaining': RuleConfig<NoUnsafeOptionalChainingRuleOptions>;
  /**
   * Disallow unused expressions
   *
   * @see [no-unused-expressions](https://eslint.org/docs/latest/rules/no-unused-expressions)
   */
  'no-unused-expressions': RuleConfig<NoUnusedExpressionsRuleOptions>;
  /**
   * Disallow unused labels
   *
   * @see [no-unused-labels](https://eslint.org/docs/latest/rules/no-unused-labels)
   */
  'no-unused-labels': RuleConfig<NoUnusedLabelsRuleOptions>;
  /**
   * Disallow unused private class members
   *
   * @see [no-unused-private-class-members](https://eslint.org/docs/latest/rules/no-unused-private-class-members)
   */
  'no-unused-private-class-members': RuleConfig<NoUnusedPrivateClassMembersRuleOptions>;
  /**
   * Disallow unused variables
   *
   * @see [no-unused-vars](https://eslint.org/docs/latest/rules/no-unused-vars)
   */
  'no-unused-vars': RuleConfig<NoUnusedVarsRuleOptions>;
  /**
   * Disallow the use of variables before they are defined
   *
   * @see [no-use-before-define](https://eslint.org/docs/latest/rules/no-use-before-define)
   */
  'no-use-before-define': RuleConfig<NoUseBeforeDefineRuleOptions>;
  /**
   * Disallow useless backreferences in regular expressions
   *
   * @see [no-useless-backreference](https://eslint.org/docs/latest/rules/no-useless-backreference)
   */
  'no-useless-backreference': RuleConfig<NoUselessBackreferenceRuleOptions>;
  /**
   * Disallow unnecessary calls to `.call()` and `.apply()`
   *
   * @see [no-useless-call](https://eslint.org/docs/latest/rules/no-useless-call)
   */
  'no-useless-call': RuleConfig<NoUselessCallRuleOptions>;
  /**
   * Disallow unnecessary `catch` clauses
   *
   * @see [no-useless-catch](https://eslint.org/docs/latest/rules/no-useless-catch)
   */
  'no-useless-catch': RuleConfig<NoUselessCatchRuleOptions>;
  /**
   * Disallow unnecessary computed property keys in objects and classes
   *
   * @see [no-useless-computed-key](https://eslint.org/docs/latest/rules/no-useless-computed-key)
   */
  'no-useless-computed-key': RuleConfig<NoUselessComputedKeyRuleOptions>;
  /**
   * Disallow unnecessary concatenation of literals or template literals
   *
   * @see [no-useless-concat](https://eslint.org/docs/latest/rules/no-useless-concat)
   */
  'no-useless-concat': RuleConfig<NoUselessConcatRuleOptions>;
  /**
   * Disallow unnecessary constructors
   *
   * @see [no-useless-constructor](https://eslint.org/docs/latest/rules/no-useless-constructor)
   */
  'no-useless-constructor': RuleConfig<NoUselessConstructorRuleOptions>;
  /**
   * Disallow unnecessary escape characters
   *
   * @see [no-useless-escape](https://eslint.org/docs/latest/rules/no-useless-escape)
   */
  'no-useless-escape': RuleConfig<NoUselessEscapeRuleOptions>;
  /**
   * Disallow renaming import, export, and destructured assignments to the same name
   *
   * @see [no-useless-rename](https://eslint.org/docs/latest/rules/no-useless-rename)
   */
  'no-useless-rename': RuleConfig<NoUselessRenameRuleOptions>;
  /**
   * Disallow redundant return statements
   *
   * @see [no-useless-return](https://eslint.org/docs/latest/rules/no-useless-return)
   */
  'no-useless-return': RuleConfig<NoUselessReturnRuleOptions>;
  /**
   * Require `let` or `const` instead of `var`
   *
   * @see [no-var](https://eslint.org/docs/latest/rules/no-var)
   */
  'no-var': RuleConfig<NoVarRuleOptions>;
  /**
   * Disallow `void` operators
   *
   * @see [no-void](https://eslint.org/docs/latest/rules/no-void)
   */
  'no-void': RuleConfig<NoVoidRuleOptions>;
  /**
   * Disallow specified warning terms in comments
   *
   * @see [no-warning-comments](https://eslint.org/docs/latest/rules/no-warning-comments)
   */
  'no-warning-comments': RuleConfig<NoWarningCommentsRuleOptions>;
  /**
   * Disallow whitespace before properties
   *
   * @see [no-whitespace-before-property](https://eslint.org/docs/latest/rules/no-whitespace-before-property)
   */
  'no-whitespace-before-property': RuleConfig<NoWhitespaceBeforePropertyRuleOptions>;
  /**
   * Disallow `with` statements
   *
   * @see [no-with](https://eslint.org/docs/latest/rules/no-with)
   */
  'no-with': RuleConfig<NoWithRuleOptions>;
  /**
   * Enforce the location of single-line statements
   *
   * @see [nonblock-statement-body-position](https://eslint.org/docs/latest/rules/nonblock-statement-body-position)
   */
  'nonblock-statement-body-position': RuleConfig<NonblockStatementBodyPositionRuleOptions>;
  /**
   * Enforce consistent line breaks after opening and before closing braces
   *
   * @see [object-curly-newline](https://eslint.org/docs/latest/rules/object-curly-newline)
   */
  'object-curly-newline': RuleConfig<ObjectCurlyNewlineRuleOptions>;
  /**
   * Enforce consistent spacing inside braces
   *
   * @see [object-curly-spacing](https://eslint.org/docs/latest/rules/object-curly-spacing)
   */
  'object-curly-spacing': RuleConfig<ObjectCurlySpacingRuleOptions>;
  /**
   * Enforce placing object properties on separate lines
   *
   * @see [object-property-newline](https://eslint.org/docs/latest/rules/object-property-newline)
   */
  'object-property-newline': RuleConfig<ObjectPropertyNewlineRuleOptions>;
  /**
   * Require or disallow method and property shorthand syntax for object literals
   *
   * @see [object-shorthand](https://eslint.org/docs/latest/rules/object-shorthand)
   */
  'object-shorthand': RuleConfig<ObjectShorthandRuleOptions>;
  /**
   * Enforce variables to be declared either together or separately in functions
   *
   * @see [one-var](https://eslint.org/docs/latest/rules/one-var)
   */
  'one-var': RuleConfig<OneVarRuleOptions>;
  /**
   * Require or disallow newlines around variable declarations
   *
   * @see [one-var-declaration-per-line](https://eslint.org/docs/latest/rules/one-var-declaration-per-line)
   */
  'one-var-declaration-per-line': RuleConfig<OneVarDeclarationPerLineRuleOptions>;
  /**
   * Require or disallow assignment operator shorthand where possible
   *
   * @see [operator-assignment](https://eslint.org/docs/latest/rules/operator-assignment)
   */
  'operator-assignment': RuleConfig<OperatorAssignmentRuleOptions>;
  /**
   * Enforce consistent linebreak style for operators
   *
   * @see [operator-linebreak](https://eslint.org/docs/latest/rules/operator-linebreak)
   */
  'operator-linebreak': RuleConfig<OperatorLinebreakRuleOptions>;
  /**
   * Require or disallow padding within blocks
   *
   * @see [padded-blocks](https://eslint.org/docs/latest/rules/padded-blocks)
   */
  'padded-blocks': RuleConfig<PaddedBlocksRuleOptions>;
  /**
   * Require or disallow padding lines between statements
   *
   * @see [padding-line-between-statements](https://eslint.org/docs/latest/rules/padding-line-between-statements)
   */
  'padding-line-between-statements': RuleConfig<PaddingLineBetweenStatementsRuleOptions>;
  /**
   * Require using arrow functions for callbacks
   *
   * @see [prefer-arrow-callback](https://eslint.org/docs/latest/rules/prefer-arrow-callback)
   */
  'prefer-arrow-callback': RuleConfig<PreferArrowCallbackRuleOptions>;
  /**
   * Require `const` declarations for variables that are never reassigned after declared
   *
   * @see [prefer-const](https://eslint.org/docs/latest/rules/prefer-const)
   */
  'prefer-const': RuleConfig<PreferConstRuleOptions>;
  /**
   * Require destructuring from arrays and/or objects
   *
   * @see [prefer-destructuring](https://eslint.org/docs/latest/rules/prefer-destructuring)
   */
  'prefer-destructuring': RuleConfig<PreferDestructuringRuleOptions>;
  /**
   * Disallow the use of `Math.pow` in favor of the `**` operator
   *
   * @see [prefer-exponentiation-operator](https://eslint.org/docs/latest/rules/prefer-exponentiation-operator)
   */
  'prefer-exponentiation-operator': RuleConfig<PreferExponentiationOperatorRuleOptions>;
  /**
   * Enforce using named capture group in regular expression
   *
   * @see [prefer-named-capture-group](https://eslint.org/docs/latest/rules/prefer-named-capture-group)
   */
  'prefer-named-capture-group': RuleConfig<PreferNamedCaptureGroupRuleOptions>;
  /**
   * Disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals
   *
   * @see [prefer-numeric-literals](https://eslint.org/docs/latest/rules/prefer-numeric-literals)
   */
  'prefer-numeric-literals': RuleConfig<PreferNumericLiteralsRuleOptions>;
  /**
   * Disallow use of `Object.prototype.hasOwnProperty.call()` and prefer use of `Object.hasOwn()`
   *
   * @see [prefer-object-has-own](https://eslint.org/docs/latest/rules/prefer-object-has-own)
   */
  'prefer-object-has-own': RuleConfig<PreferObjectHasOwnRuleOptions>;
  /**
   * Disallow using Object.assign with an object literal as the first argument and prefer the use of object spread instead
   *
   * @see [prefer-object-spread](https://eslint.org/docs/latest/rules/prefer-object-spread)
   */
  'prefer-object-spread': RuleConfig<PreferObjectSpreadRuleOptions>;
  /**
   * Require using Error objects as Promise rejection reasons
   *
   * @see [prefer-promise-reject-errors](https://eslint.org/docs/latest/rules/prefer-promise-reject-errors)
   */
  'prefer-promise-reject-errors': RuleConfig<PreferPromiseRejectErrorsRuleOptions>;
  /**
   * Require `Reflect` methods where applicable
   *
   * @see [prefer-reflect](https://eslint.org/docs/latest/rules/prefer-reflect)
   */
  'prefer-reflect': RuleConfig<PreferReflectRuleOptions>;
  /**
   * Disallow use of the `RegExp` constructor in favor of regular expression literals
   *
   * @see [prefer-regex-literals](https://eslint.org/docs/latest/rules/prefer-regex-literals)
   */
  'prefer-regex-literals': RuleConfig<PreferRegexLiteralsRuleOptions>;
  /**
   * Require rest parameters instead of `arguments`
   *
   * @see [prefer-rest-params](https://eslint.org/docs/latest/rules/prefer-rest-params)
   */
  'prefer-rest-params': RuleConfig<PreferRestParamsRuleOptions>;
  /**
   * Require spread operators instead of `.apply()`
   *
   * @see [prefer-spread](https://eslint.org/docs/latest/rules/prefer-spread)
   */
  'prefer-spread': RuleConfig<PreferSpreadRuleOptions>;
  /**
   * Require template literals instead of string concatenation
   *
   * @see [prefer-template](https://eslint.org/docs/latest/rules/prefer-template)
   */
  'prefer-template': RuleConfig<PreferTemplateRuleOptions>;
  /**
   * Require quotes around object literal property names
   *
   * @see [quote-props](https://eslint.org/docs/latest/rules/quote-props)
   */
  'quote-props': RuleConfig<QuotePropsRuleOptions>;
  /**
   * Enforce the consistent use of either backticks, double, or single quotes
   *
   * @see [quotes](https://eslint.org/docs/latest/rules/quotes)
   */
  quotes: RuleConfig<QuotesRuleOptions>;
  /**
   * Enforce the consistent use of the radix argument when using `parseInt()`
   *
   * @see [radix](https://eslint.org/docs/latest/rules/radix)
   */
  radix: RuleConfig<RadixRuleOptions>;
  /**
   * Disallow assignments that can lead to race conditions due to usage of `await` or `yield`
   *
   * @see [require-atomic-updates](https://eslint.org/docs/latest/rules/require-atomic-updates)
   */
  'require-atomic-updates': RuleConfig<RequireAtomicUpdatesRuleOptions>;
  /**
   * Disallow async functions which have no `await` expression
   *
   * @see [require-await](https://eslint.org/docs/latest/rules/require-await)
   */
  'require-await': RuleConfig<RequireAwaitRuleOptions>;
  /**
   * Require JSDoc comments
   *
   * @see [require-jsdoc](https://eslint.org/docs/latest/rules/require-jsdoc)
   */
  'require-jsdoc': RuleConfig<RequireJsdocRuleOptions>;
  /**
   * Enforce the use of `u` or `v` flag on RegExp
   *
   * @see [require-unicode-regexp](https://eslint.org/docs/latest/rules/require-unicode-regexp)
   */
  'require-unicode-regexp': RuleConfig<RequireUnicodeRegexpRuleOptions>;
  /**
   * Require generator functions to contain `yield`
   *
   * @see [require-yield](https://eslint.org/docs/latest/rules/require-yield)
   */
  'require-yield': RuleConfig<RequireYieldRuleOptions>;
  /**
   * Enforce spacing between rest and spread operators and their expressions
   *
   * @see [rest-spread-spacing](https://eslint.org/docs/latest/rules/rest-spread-spacing)
   */
  'rest-spread-spacing': RuleConfig<RestSpreadSpacingRuleOptions>;
  /**
   * Require or disallow semicolons instead of ASI
   *
   * @see [semi](https://eslint.org/docs/latest/rules/semi)
   */
  semi: RuleConfig<SemiRuleOptions>;
  /**
   * Enforce consistent spacing before and after semicolons
   *
   * @see [semi-spacing](https://eslint.org/docs/latest/rules/semi-spacing)
   */
  'semi-spacing': RuleConfig<SemiSpacingRuleOptions>;
  /**
   * Enforce location of semicolons
   *
   * @see [semi-style](https://eslint.org/docs/latest/rules/semi-style)
   */
  'semi-style': RuleConfig<SemiStyleRuleOptions>;
  /**
   * Enforce sorted import declarations within modules
   *
   * @see [sort-imports](https://eslint.org/docs/latest/rules/sort-imports)
   */
  'sort-imports': RuleConfig<SortImportsRuleOptions>;
  /**
   * Require object keys to be sorted
   *
   * @see [sort-keys](https://eslint.org/docs/latest/rules/sort-keys)
   */
  'sort-keys': RuleConfig<SortKeysRuleOptions>;
  /**
   * Require variables within the same declaration block to be sorted
   *
   * @see [sort-vars](https://eslint.org/docs/latest/rules/sort-vars)
   */
  'sort-vars': RuleConfig<SortVarsRuleOptions>;
  /**
   * Enforce consistent spacing before blocks
   *
   * @see [space-before-blocks](https://eslint.org/docs/latest/rules/space-before-blocks)
   */
  'space-before-blocks': RuleConfig<SpaceBeforeBlocksRuleOptions>;
  /**
   * Enforce consistent spacing before `function` definition opening parenthesis
   *
   * @see [space-before-function-paren](https://eslint.org/docs/latest/rules/space-before-function-paren)
   */
  'space-before-function-paren': RuleConfig<SpaceBeforeFunctionParenRuleOptions>;
  /**
   * Enforce consistent spacing inside parentheses
   *
   * @see [space-in-parens](https://eslint.org/docs/latest/rules/space-in-parens)
   */
  'space-in-parens': RuleConfig<SpaceInParensRuleOptions>;
  /**
   * Require spacing around infix operators
   *
   * @see [space-infix-ops](https://eslint.org/docs/latest/rules/space-infix-ops)
   */
  'space-infix-ops': RuleConfig<SpaceInfixOpsRuleOptions>;
  /**
   * Enforce consistent spacing before or after unary operators
   *
   * @see [space-unary-ops](https://eslint.org/docs/latest/rules/space-unary-ops)
   */
  'space-unary-ops': RuleConfig<SpaceUnaryOpsRuleOptions>;
  /**
   * Enforce consistent spacing after the `//` or `/*` in a comment
   *
   * @see [spaced-comment](https://eslint.org/docs/latest/rules/spaced-comment)
   */
  'spaced-comment': RuleConfig<SpacedCommentRuleOptions>;
  /**
   * Require or disallow strict mode directives
   *
   * @see [strict](https://eslint.org/docs/latest/rules/strict)
   */
  strict: RuleConfig<StrictRuleOptions>;
  /**
   * Enforce spacing around colons of switch statements
   *
   * @see [switch-colon-spacing](https://eslint.org/docs/latest/rules/switch-colon-spacing)
   */
  'switch-colon-spacing': RuleConfig<SwitchColonSpacingRuleOptions>;
  /**
   * Require symbol descriptions
   *
   * @see [symbol-description](https://eslint.org/docs/latest/rules/symbol-description)
   */
  'symbol-description': RuleConfig<SymbolDescriptionRuleOptions>;
  /**
   * Require or disallow spacing around embedded expressions of template strings
   *
   * @see [template-curly-spacing](https://eslint.org/docs/latest/rules/template-curly-spacing)
   */
  'template-curly-spacing': RuleConfig<TemplateCurlySpacingRuleOptions>;
  /**
   * Require or disallow spacing between template tags and their literals
   *
   * @see [template-tag-spacing](https://eslint.org/docs/latest/rules/template-tag-spacing)
   */
  'template-tag-spacing': RuleConfig<TemplateTagSpacingRuleOptions>;
  /**
   * Require or disallow Unicode byte order mark (BOM)
   *
   * @see [unicode-bom](https://eslint.org/docs/latest/rules/unicode-bom)
   */
  'unicode-bom': RuleConfig<UnicodeBomRuleOptions>;
  /**
   * Require calls to `isNaN()` when checking for `NaN`
   *
   * @see [use-isnan](https://eslint.org/docs/latest/rules/use-isnan)
   */
  'use-isnan': RuleConfig<UseIsnanRuleOptions>;
  /**
   * Enforce valid JSDoc comments
   *
   * @see [valid-jsdoc](https://eslint.org/docs/latest/rules/valid-jsdoc)
   */
  'valid-jsdoc': RuleConfig<ValidJsdocRuleOptions>;
  /**
   * Enforce comparing `typeof` expressions against valid strings
   *
   * @see [valid-typeof](https://eslint.org/docs/latest/rules/valid-typeof)
   */
  'valid-typeof': RuleConfig<ValidTypeofRuleOptions>;
  /**
   * Require `var` declarations be placed at the top of their containing scope
   *
   * @see [vars-on-top](https://eslint.org/docs/latest/rules/vars-on-top)
   */
  'vars-on-top': RuleConfig<VarsOnTopRuleOptions>;
  /**
   * Require parentheses around immediate `function` invocations
   *
   * @see [wrap-iife](https://eslint.org/docs/latest/rules/wrap-iife)
   */
  'wrap-iife': RuleConfig<WrapIifeRuleOptions>;
  /**
   * Require parenthesis around regex literals
   *
   * @see [wrap-regex](https://eslint.org/docs/latest/rules/wrap-regex)
   */
  'wrap-regex': RuleConfig<WrapRegexRuleOptions>;
  /**
   * Require or disallow spacing around the `*` in `yield*` expressions
   *
   * @see [yield-star-spacing](https://eslint.org/docs/latest/rules/yield-star-spacing)
   */
  'yield-star-spacing': RuleConfig<YieldStarSpacingRuleOptions>;
  /**
   * Require or disallow "Yoda" conditions
   *
   * @see [yoda](https://eslint.org/docs/latest/rules/yoda)
   */
  yoda: RuleConfig<YodaRuleOptions>;
}

/**
 * This is a special exported interface for other packages to declare
 * additional types that should bail out for eslint rules. For example
 * `@typescript-eslint/eslint-plugin` can declare it like so in its `d.ts`:
 *
 * ```ts
 * declare module 'eslint-define-config' {
 *   export interface CustomRuleOptions {
 *     /**
 *      * Require consistently using either `T[]` or `Array<T>` for arrays.
 *      *
 *      * \@see [array-type](https://typescript-eslint.io/rules/array-type)
 *      *\/
 *     '@typescript-eslint/array-type': [
 *       {
 *         default?: 'array' | 'generic' | 'array-simple';
 *         readonly?: 'array' | 'generic' | 'array-simple';
 *       },
 *     ];
 *
 *     // ... more Rules
 *   }
 * }
 * ```
 */
interface CustomRuleOptions {}

type CustomRules = {
  [TRuleName in keyof CustomRuleOptions]: RuleConfig<
    CustomRuleOptions[TRuleName]
  >;
};

/**
 * Rules.
 *
 * @see [Rules](https://eslint.org/docs/user-guide/configuring/rules)
 */
interface Rules
  extends CustomRules,
    EslintRules,
    Record<string, RuleConfig> {}

/**
 * An environment provides predefined global variables.
 *
 * @see [Environments](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments)
 */
interface Environments extends Partial<Record<string, boolean>> {
  /**
   * Browser global variables.
   */
  browser?: boolean;

  /**
   * Node.js global variables and Node.js scoping.
   */
  node?: boolean;

  /**
   * CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
   */
  commonjs?: boolean;

  /**
   * Globals common to both Node.js and Browser.
   */
  'shared-node-browser'?: boolean;

  /**
   * Enable all ECMAScript 6 features except for modules (this automatically sets the `ecmaVersion` parser option to 6).
   */
  es6?: boolean;

  /**
   * Adds all ECMAScript 2016 globals and automatically sets the `ecmaVersion` parser option to 7.
   */
  es2016?: boolean;

  /**
   * Adds all ECMAScript 2017 globals and automatically sets the `ecmaVersion` parser option to 8.
   */
  es2017?: boolean;

  /**
   * Adds all ECMAScript 2018 globals and automatically sets the `ecmaVersion` parser option to 9.
   */
  es2018?: boolean;

  /**
   * Adds all ECMAScript 2019 globals and automatically sets the `ecmaVersion` parser option to 10.
   */
  es2019?: boolean;

  /**
   * Adds all ECMAScript 2020 globals and automatically sets the `ecmaVersion` parser option to 11.
   */
  es2020?: boolean;

  /**
   * Adds all ECMAScript 2021 globals and automatically sets the `ecmaVersion` parser option to 12.
   */
  es2021?: boolean;

  /**
   * Adds all ECMAScript 2022 globals and automatically sets the `ecmaVersion` parser option to 13.
   */
  es2022?: boolean;

  /**
   * Adds all ECMAScript 2023 globals and automatically sets the `ecmaVersion` parser option to 14.
   */
  es2023?: boolean;

  /**
   * Web workers global variables.
   */
  worker?: boolean;

  /**
   * Defines `require()` and `define()` as global variables as per the amd spec.
   */
  amd?: boolean;

  /**
   * Adds all of the Mocha testing global variables.
   */
  mocha?: boolean;

  /**
   * Adds all of the Jasmine testing global variables for version 1.3 and 2.0.
   */
  jasmine?: boolean;

  /**
   * Jest global variables.
   */
  jest?: boolean;

  /**
   * PhantomJS global variables.
   */
  phantomjs?: boolean;

  /**
   * Protractor global variables.
   */
  protractor?: boolean;

  /**
   * QUnit global variables.
   */
  qunit?: boolean;

  /**
   * jQuery global variables.
   */
  jquery?: boolean;

  /**
   * Prototype.js global variables.
   */
  prototypejs?: boolean;

  /**
   * ShellJS global variables.
   */
  shelljs?: boolean;

  /**
   * Meteor global variables.
   */
  meteor?: boolean;

  /**
   * MongoDB global variables.
   */
  mongo?: boolean;

  /**
   * AppleScript global variables.
   */
  applescript?: boolean;

  /**
   * Java 8 Nashorn global variables.
   */
  nashorn?: boolean;

  /**
   * Service Worker global variables.
   */
  serviceworker?: boolean;

  /**
   * Atom test helper globals.
   */
  atomtest?: boolean;

  /**
   * Ember test helper globals.
   */
  embertest?: boolean;

  /**
   * WebExtensions globals.
   */
  webextensions?: boolean;

  /**
   * GreaseMonkey globals.
   */
  greasemonkey?: boolean;
}

/**
 * This is a special exported interface for other packages to declare
 * additional extensions that should bail out for eslint extensions. For example
 * `'@typescript-eslint/eslint-plugin'` can declare it like so in its `d.ts`:
 *
 * ```ts
 * declare module 'eslint-define-config' {
 *   export interface CustomExtends {
 *     'plugin:@typescript-eslint/all': void;
 *     'plugin:@typescript-eslint/base': void;
 *     'plugin:@typescript-eslint/disable-type-checked': void;
 *     'plugin:@typescript-eslint/eslint-recommended': void;
 *     'plugin:@typescript-eslint/recommended-type-checked': void;
 *     'plugin:@typescript-eslint/recommended': void;
 *     'plugin:@typescript-eslint/strict-type-checked': void;
 *     'plugin:@typescript-eslint/strict': void;
 *     'plugin:@typescript-eslint/stylistic-type-checked': void;
 *     'plugin:@typescript-eslint/stylistic': void;
 *   }
 * }
 * ```
 */
interface CustomExtends {}

/**
 * All known extends.
 */
type KnownExtends = LiteralUnion<
  | 'eslint:recommended'
  | 'eslint:all'
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  | keyof CustomExtends
>;

/**
 * Extending Configuration Files.
 *
 * @see [Extends](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)
 */
type Extends = KnownExtends | KnownExtends[];

/**
 * This is a special exported interface for other packages to declare
 * additional plugins that should bail out for eslint plugins. For example
 * `'@typescript-eslint/eslint-plugin'` can declare it like so in its `d.ts`:
 *
 * ```ts
 * declare module 'eslint-define-config' {
 *   export interface CustomPlugins {
 *     '@typescript-eslint': void;
 *   }
 * }
 * ```
 */
interface CustomPlugins {}

/** Plugin. */
type Plugin = LiteralUnion<keyof CustomPlugins>;

/**
 * This is a special exported interface for other packages to declare
 * additional settings that should bail out for eslint settings. For example
 * `'eslint-plugin-jsx-a11y'` can declare it like so in its `d.ts`:
 *
 * ```ts
 * declare module 'eslint-define-config' {
 *   export interface CustomSettings {
 *     'jsx-a11y': {
 *       components?: Record<string, string>;
 *     };
 *   }
 * }
 * ```
 */
interface CustomSettings {}

/**
 * Settings.
 */
interface Settings
  extends Partial<CustomSettings>,
    Partial<Record<string, unknown>> {}

/**
 * OverrideConfigData.
 */
interface Override {
  /**
   * The glob patterns for target files.
   */
  // https://github.com/eslint/eslint/blob/762a8727fb3b5619cff900826053b643ca5f1162/lib/shared/types.js#L61
  files: string[] | string;

  /**
   * The glob patterns for excluded files.
   */
  // https://github.com/eslint/eslint/blob/762a8727fb3b5619cff900826053b643ca5f1162/lib/shared/types.js#L59
  excludedFiles?: string | string[];

  /**
   * An environment provides predefined global variables.
   *
   * @see [Environments](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments)
   */
  env?: Environments;

  /**
   * Extending Configuration Files.
   *
   * @see [Extends](https://eslint.org/docs/user-guide/configuring/configuration-files#extending-configuration-files)
   */
  extends?: Extends;

  /**
   * Specifying Globals.
   *
   * @see [Globals](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-globals)
   */
  globals?: Record<
    string,
    'readonly' | 'writable' | false | 'readable' | true | 'writeable' | 'off'
  >;

  /**
   * Parser.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/developer-guide/working-with-custom-parsers)
   * @see [Specifying Parser](https://eslint.org/docs/user-guide/configuring/plugins#specifying-parser)
   */
  parser?: Parser;

  /**
   * Parser Options.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/developer-guide/working-with-custom-parsers)
   * @see [Specifying Parser Options](https://eslint.org/docs/user-guide/configuring/language-options#specifying-parser-options)
   */
  parserOptions?: ParserOptions;

  /**
   * Which third-party plugins define additional rules, environments, configs, etc. for ESLint to use.
   *
   * @see [Configuring Plugins](https://eslint.org/docs/user-guide/configuring/plugins#configuring-plugins)
   */
  plugins?: Plugin[];

  /**
   * Specifying Processor.
   *
   * @see [processor](https://eslint.org/docs/user-guide/configuring/plugins#specifying-processor)
   */
  processor?: string;

  /**
   * Rules.
   *
   * @see [Rules](https://eslint.org/docs/user-guide/configuring/rules)
   */
  rules?: Partial<Rules>;

  /**
   * Settings.
   *
   * @see [Settings](https://eslint.org/docs/user-guide/configuring/configuration-files#adding-shared-settings)
   */
  settings?: Settings;
}

/**
 * Overrides.
 */
type Overrides = Override[];

/**
 * ESLint Configuration.
 *
 * @see [ESLint Configuration](https://eslint.org/docs/latest/user-guide/configuring/)
 */
interface ESLintConfig {
  /**
   * @see [Using Configuration Files](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#using-configuration-files)
   */
  root?: boolean;

  /**
   * Tell ESLint to ignore specific files and directories.
   *
   * @see [Ignore Patterns](https://eslint.org/docs/latest/user-guide/configuring/ignoring-code)
   */
  ignorePatterns?: string[];

  /**
   * An environment provides predefined global variables.
   *
   * @see [Environments](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-environments)
   */
  env?: Environments;

  /**
   * Extending Configuration Files.
   *
   * @see [Extends](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#extending-configuration-files)
   */
  extends?: Extends;

  /**
   * Specifying Globals.
   *
   * @see [Globals](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-globals)
   */
  globals?: Record<
    string,
    'readonly' | 'writable' | false | 'readable' | true | 'writeable' | 'off'
  >;

  /**
   * Parser.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/latest/developer-guide/working-with-custom-parsers)
   * @see [Specifying Parser](https://eslint.org/docs/latest/user-guide/configuring/plugins#configure-a-parser)
   */
  parser?: Parser;

  /**
   * Parser Options.
   *
   * @see [Working with Custom Parsers](https://eslint.org/docs/latest/developer-guide/working-with-custom-parsers)
   * @see [Specifying Parser Options](https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options)
   */
  parserOptions?: ParserOptions;

  /**
   * Which third-party plugins define additional rules, environments, configs, etc. for ESLint to use.
   *
   * @see [Configuring Plugins](https://eslint.org/docs/latest/user-guide/configuring/plugins#configure-plugins)
   */
  plugins?: Plugin[];

  /**
   * Specifying Processor.
   *
   * @see [processor](https://eslint.org/docs/latest/user-guide/configuring/plugins#specify-a-processor)
   */
  processor?: string;

  /**
   * Rules.
   *
   * @see [Rules](https://eslint.org/docs/latest/user-guide/configuring/rules)
   */
  rules?: Partial<Rules>;

  /**
   * Overrides.
   *
   * @see [How do overrides work](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#how-do-overrides-work)
   */
  overrides?: Overrides;

  /**
   * Settings.
   *
   * @see [Settings](https://eslint.org/docs/latest/user-guide/configuring/configuration-files#adding-shared-settings)
   */
  settings?: Settings;

  /**
   * Disabling Inline Comments.
   *
   * @see [Disabling Inline Comments](https://eslint.org/docs/latest/user-guide/configuring/rules#disabling-inline-comments)
   */
  noInlineConfig?: boolean;

  /**
   * Report unused `ESLint-disable` comments.
   *
   * @see [Report unused `ESLint-disable` comments](https://eslint.org/docs/latest/user-guide/configuring/rules#report-unused-eslint-disable-comments)
   */
  reportUnusedDisableDirectives?: boolean;
}

type ParserModule =
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parse(text: string, options?: any): any;
    }
  | {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      parseForESLint(text: string, options?: any): any;
    };

/**
 * An object containing settings related to how JavaScript is configured for linting
 */
interface LanguageOptions {
  /**
   * The version of ECMAScript to support. May be any year (i.e., `2022`) or version (i.e., `5`). Set to `"latest"` for the most recent supported version.
   *
   * @default "latest"
   * @see [Configuring the JavaScript version](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-the-javascript-version)
   */
  ecmaVersion?: EcmaVersion;

  /**
   * The type of JavaScript source code. Possible values are `"script"` for traditional script files, `"module"` for ECMAScript modules (ESM), and `"commonjs"` for CommonJS files.
   *
   * (default: `"module"` for .js and .mjs files; `"commonjs"` for .cjs files)
   *
   * @see [Configuring the JavaScript source type](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-the-javascript-source-type)
   */
  sourceType?: SourceType | 'commonjs';

  /**
   * An object specifying additional objects that should be added to the global scope during linting.
   *
   * @see [Configuring global variables](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-global-variables)
   */
  globals?: Record<
    string,
    'readonly' | 'writable' | false | 'readable' | true | 'writeable' | 'off'
  >;

  /**
   * Either an object containing a `parse()` method or a string indicating the name of a parser inside of a plugin (i.e., `"pluginName/parserName"`).
   *
   * @default "@/espree"
   *
   * @see [Configuring a custom parser and its options](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-a-custom-parser-and-its-options)
   */
  parser?: Parser | ParserModule;

  /**
   * An object specifying additional options that are passed directly to the `parser()` method on the parser. The available options are parser-dependent.
   *
   * @see [Configuring a custom parser and its options](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-a-custom-parser-and-its-options)
   */
  parserOptions?: ParserOptions;
}

/**
 * An object containing settings related to the linting process.
 */
interface LinterOptions {
  /**
   * A boolean value indicating if inline configuration is allowed.
   *
   * @see [Disabling inline configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#disabling-inline-configuration)
   */
  noInlineConfig?: boolean;

  /**
   * A boolean value indicating if unused disable directives should be tracked and reported.
   *
   * @see [Reporting unused disable directives](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#reporting-unused-disable-directives)
   */
  reportUnusedDisableDirectives?: boolean;
}

/**
 * Flat ESLint Configuration.
 *
 * @see [Configuration Files (New)](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new)
 */
interface FlatESLintConfig {
  /**
   * An array of glob patterns indicating the files that the configuration object should apply to. If not specified, the configuration object applies to all files.
   *
   * @see [Ignore Patterns](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#excluding-files-with-ignores)
   */
  files?: string[];

  /**
   * An array of glob patterns indicating the files that the configuration object should not apply to. If not specified, the configuration object applies to all files matched by files.
   *
   * @see [Ignore Patterns](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#excluding-files-with-ignores)
   */
  ignores?: string[];

  /**
   * An object containing settings related to how JavaScript is configured for linting.
   *
   * @see [Configuring language options](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-language-options)
   */
  languageOptions?: LanguageOptions;

  /**
   * An object containing settings related to the linting process.
   */
  linterOptions?: LinterOptions;

  /**
   * Either an object containing `preprocess()` and `postprocess()` methods or a string indicating the name of a processor inside of a plugin (i.e., `"pluginName/processorName"`).
   *
   * @see [Using processors](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-processors)
   */
  processor?: string | Linter.Processor;

  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, ESLint.Plugin>;

  /**
   * An object containing the configured rules. When `files` or `ignores` are specified, these rule configurations are only available to the matching files.
   *
   * @see [Configuring rules](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-rules)
   */
  rules?: Partial<Rules>;

  /**
   * An object containing name-value pairs of information that should be available to all rules.
   *
   * @see [Configuring shared settings](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-shared-settings)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settings?: Record<string, any>;
}

/**
 * Define an ESLint config.
 *
 * @param config ESLint config.
 * @returns ESLint config.
 */
declare function defineConfig(config: ESLintConfig): ESLintConfig;
/**
 * Define an item of Flat ESLint config.
 *
 * @see [Configuration Files (New)](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new)
 *
 * @param config an item of Flat ESLint config.
 * @returns an item of Flat ESLint config.
 */
declare function defineFlatConfig(config: FlatESLintConfig): FlatESLintConfig;
/**
 * Define a flat ESLint config.
 *
 * @see [Configuration Files (New)](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new)
 *
 * @param config Flat ESLint config.
 * @returns Flat ESLint config.
 */
declare function defineFlatConfig(config: ReadonlyArray<FlatESLintConfig>): FlatESLintConfig[];

export { type CustomExtends, type CustomParserOptions, type CustomParsers, type CustomPlugins, type CustomRuleOptions, type CustomSettings, type ESLintConfig, type EcmaFeatures, type EcmaVersion, type Environments, type Extends, type FlatESLintConfig, type KnownExtends, type LanguageOptions, type Lib, type LinterOptions, type Override, type Overrides, type Parser, type ParserModule, type ParserOptions, type Plugin, type Rules, type Settings, type SourceType, defineConfig, defineFlatConfig };

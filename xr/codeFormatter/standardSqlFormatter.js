import SqlFormatter from "xr/codeFormatter/SqlFormatter";

// Reserved words
const reservedWords = [
    "ACCESSIBLE", "ACTION", "AGAINST", "AGGREGATE", "ALGORITHM", "ALL", "ALTER", "ANALYSE", "ANALYZE", "AS", "ASC",
    "AUTOCOMMIT", "AUTO_INCREMENT", "BACKUP", "BEGIN", "BETWEEN", "BINLOG", "BOTH", "CASCADE", "CASE", "CHANGE", "CHANGED", "CHARACTER SET",
    "CHARSET", "CHECK", "CHECKSUM", "COLLATE", "COLLATION", "COLUMN", "COLUMNS", "COMMENT", "COMMIT", "COMMITTED",
    "COMPRESSED", "CONCURRENT",
    "CONSTRAINT", "CONTAINS", "CONVERT", "CREATE", "CROSS", "CURRENT_TIMESTAMP", "DATABASE", "DATABASES", "DAY", "DAY_HOUR", "DAY_MINUTE",
    "DAY_SECOND", "DEFAULT", "DEFINER", "DELAYED", "DELETE", "DESC", "DESCRIBE", "DETERMINISTIC", "DISTINCT", "DISTINCTROW", "DIV",
    "DO", "DUMPFILE", "DUPLICATE", "DYNAMIC", "ELSE", "ENCLOSED", "END", "ENGINE", "ENGINE_TYPE", "ENGINES", "ESCAPE",
    "ESCAPED", "EVENTS", "EXEC",
    "EXECUTE", "EXISTS", "EXPLAIN", "EXTENDED", "FAST", "FIELDS", "FILE", "FIRST", "FIXED", "FLUSH", "FOR", "FORCE",
    "FOREIGN", "FULL", "FULLTEXT",
    "FUNCTION", "GLOBAL", "GRANT", "GRANTS", "GROUP_CONCAT", "HEAP", "HIGH_PRIORITY", "HOSTS", "HOUR", "HOUR_MINUTE",
    "HOUR_SECOND", "IDENTIFIED", "IF", "IFNULL", "IGNORE", "IN", "INDEX", "INDEXES", "INFILE", "INSERT", "INSERT_ID",
    "INSERT_METHOD", "INTERVAL",
    "INTO", "INVOKER", "IS", "ISOLATION", "KEY", "KEYS", "KILL", "LAST_INSERT_ID", "LEADING", "LEVEL", "LIKE", "LINEAR",
    "LINES", "LOAD", "LOCAL", "LOCK", "LOCKS", "LOGS", "LOW_PRIORITY", "MARIA", "MASTER", "MASTER_CONNECT_RETRY",
    "MASTER_HOST", "MASTER_LOG_FILE",
    "MATCH", "MAX_CONNECTIONS_PER_HOUR", "MAX_QUERIES_PER_HOUR", "MAX_ROWS", "MAX_UPDATES_PER_HOUR", "MAX_USER_CONNECTIONS",
    "MEDIUM", "MERGE", "MINUTE", "MINUTE_SECOND", "MIN_ROWS", "MODE", "MODIFY",
    "MONTH", "MRG_MYISAM", "MYISAM", "NAMES", "NATURAL", "NOT", "NOW()", "NULL", "OFFSET", "ON", "OPEN", "OPTIMIZE", "OPTION", "OPTIONALLY",
    "ON UPDATE", "ON DELETE", "OUTFILE", "PACK_KEYS", "PAGE", "PARTIAL", "PARTITION", "PARTITIONS", "PASSWORD", "PRIMARY",
    "PRIVILEGES", "PROCEDURE",
    "PROCESS", "PROCESSLIST", "PURGE", "QUICK", "RANGE", "RAID0", "RAID_CHUNKS", "RAID_CHUNKSIZE", "RAID_TYPE", "READ", "READ_ONLY",
    "READ_WRITE", "REFERENCES", "REGEXP", "RELOAD", "RENAME", "REPAIR", "REPEATABLE", "REPLACE", "REPLICATION", "RESET",
    "RESTORE", "RESTRICT",
    "RETURN", "RETURNS", "REVOKE", "RLIKE", "ROLLBACK", "ROW", "ROWS", "ROW_FORMAT", "SECOND", "SECURITY", "SEPARATOR",
    "SERIALIZABLE", "SESSION", "SHARE", "SHOW", "SHUTDOWN", "SLAVE", "SONAME", "SOUNDS", "SQL", "SQL_AUTO_IS_NULL", "SQL_BIG_RESULT",
    "SQL_BIG_SELECTS", "SQL_BIG_TABLES", "SQL_BUFFER_RESULT", "SQL_CALC_FOUND_ROWS", "SQL_LOG_BIN", "SQL_LOG_OFF", "SQL_LOG_UPDATE",
    "SQL_LOW_PRIORITY_UPDATES", "SQL_MAX_JOIN_SIZE", "SQL_QUOTE_SHOW_CREATE", "SQL_SAFE_UPDATES",
    "SQL_SELECT_LIMIT", "SQL_SLAVE_SKIP_COUNTER",
    "SQL_SMALL_RESULT", "SQL_WARNINGS", "SQL_CACHE", "SQL_NO_CACHE", "START", "STARTING", "STATUS", "STOP", "STORAGE",
    "STRAIGHT_JOIN", "STRING", "STRIPED", "SUPER", "TABLE", "TABLES", "TEMPORARY", "TERMINATED", "THEN", "TO", "TRAILING",
    "TRANSACTIONAL", "TRUE",
    "TRUNCATE", "TYPE", "TYPES", "UNCOMMITTED", "UNIQUE", "UNLOCK", "UNSIGNED", "USAGE", "USE", "USING", "VARIABLES",
    "VIEW", "WHEN", "WITH", "WORK", "WRITE", "YEAR_MONTH"
];

// Words that are query starters
const reservedToplevelWords = [
    "SELECT", "FROM", "WHERE", "SET", "ORDER BY", "GROUP BY", "LIMIT", "DROP",
    "VALUES", "UPDATE", "HAVING", "ADD", "AFTER", "ALTER TABLE", "DELETE FROM", "UNION ALL", "UNION", "EXCEPT", "INTERSECT"
];

// Words that are set to newline
const reservedNewlineWords = [
    "LEFT OUTER JOIN", "RIGHT OUTER JOIN", "LEFT JOIN", "RIGHT JOIN", "OUTER JOIN", "INNER JOIN", "JOIN", "XOR", "OR", "AND"
];

// Words that are uppercased as function names
const functionWords = [
    "ABS", "ACOS", "ADDDATE", "ADDTIME", "AES_DECRYPT", "AES_ENCRYPT", "AREA", "ASBINARY", "ASCII", "ASIN", "ASTEXT", "ATAN", "ATAN2",
    "AVG", "BDMPOLYFROMTEXT", "BDMPOLYFROMWKB", "BDPOLYFROMTEXT", "BDPOLYFROMWKB", "BENCHMARK", "BIN", "BIT_AND", "BIT_COUNT", "BIT_LENGTH",
    "BIT_OR", "BIT_XOR", "BOUNDARY", "BUFFER", "CAST", "CEIL", "CEILING", "CENTROID", "CHAR", "CHARACTER_LENGTH", "CHARSET", "CHAR_LENGTH",
    "COALESCE", "COERCIBILITY", "COLLATION", "COMPRESS", "CONCAT", "CONCAT_WS", "CONNECTION_ID", "CONTAINS", "CONV", "CONVERT",
    "CONVERT_TZ", "CONVEXHULL", "COS", "COT", "COUNT", "CRC32", "CROSSES", "CURDATE", "CURRENT_DATE", "CURRENT_TIME", "CURRENT_TIMESTAMP",
    "CURRENT_USER", "CURTIME", "DATABASE", "DATE", "DATEDIFF", "DATE_ADD", "DATE_DIFF", "DATE_FORMAT", "DATE_SUB", "DAY", "DAYNAME",
    "DAYOFMONTH", "DAYOFWEEK", "DAYOFYEAR", "DECODE", "DEFAULT", "DEGREES", "DES_DECRYPT", "DES_ENCRYPT", "DIFFERENCE", "DIMENSION",
    "DISJOINT", "DISTANCE", "ELT", "ENCODE", "ENCRYPT", "ENDPOINT", "ENVELOPE", "EQUALS", "EXP", "EXPORT_SET", "EXTERIORRING",
    "EXTRACT", "EXTRACTVALUE", "FIELD", "FIND_IN_SET", "FLOOR", "FORMAT", "FOUND_ROWS", "FROM_DAYS", "FROM_UNIXTIME", "GEOMCOLLFROMTEXT",
    "GEOMCOLLFROMWKB", "GEOMETRYCOLLECTION", "GEOMETRYCOLLECTIONFROMTEXT", "GEOMETRYCOLLECTIONFROMWKB", "GEOMETRYFROMTEXT",
    "GEOMETRYFROMWKB", "GEOMETRYN", "GEOMETRYTYPE", "GEOMFROMTEXT", "GEOMFROMWKB", "GET_FORMAT", "GET_LOCK", "GLENGTH", "GREATEST",
    "GROUP_CONCAT", "GROUP_UNIQUE_USERS", "HEX", "HOUR", "IF", "IFNULL", "INET_ATON", "INET_NTOA", "INSERT", "INSTR",
    "INTERIORRINGN", "INTERSECTION", "INTERSECTS", "INTERVAL", "ISCLOSED", "ISEMPTY", "ISNULL", "ISRING", "ISSIMPLE",
    "IS_FREE_LOCK", "IS_USED_LOCK", "LAST_DAY", "LAST_INSERT_ID", "LCASE", "LEAST", "LEFT", "LENGTH", "LINEFROMTEXT", "LINEFROMWKB",
    "LINESTRING", "LINESTRINGFROMTEXT", "LINESTRINGFROMWKB", "LN", "LOAD_FILE", "LOCALTIME", "LOCALTIMESTAMP", "LOCATE", "LOG",
    "LOG10", "LOG2", "LOWER", "LPAD", "LTRIM", "MAKEDATE", "MAKETIME", "MAKE_SET", "MASTER_POS_WAIT", "MAX", "MBRCONTAINS",
    "MBRDISJOINT", "MBREQUAL", "MBRINTERSECTS", "MBROVERLAPS", "MBRTOUCHES", "MBRWITHIN", "MD5", "MICROSECOND", "MID",
    "MIN", "MINUTE", "MLINEFROMTEXT", "MLINEFROMWKB", "MOD", "MONTH", "MONTHNAME", "MPOINTFROMTEXT", "MPOINTFROMWKB",
    "MPOLYFROMTEXT", "MPOLYFROMWKB", "MULTILINESTRING", "MULTILINESTRINGFROMTEXT", "MULTILINESTRINGFROMWKB", "MULTIPOINT",
    "MULTIPOINTFROMTEXT", "MULTIPOINTFROMWKB", "MULTIPOLYGON", "MULTIPOLYGONFROMTEXT", "MULTIPOLYGONFROMWKB",
    "NAME_CONST", "NULLIF", "NUMGEOMETRIES", "NUMINTERIORRINGS", "NUMPOINTS", "OCT", "OCTET_LENGTH", "OLD_PASSWORD",
    "ORD", "OVERLAPS", "PASSWORD", "PERIOD_ADD", "PERIOD_DIFF", "PI", "POINT", "POINTFROMTEXT", "POINTFROMWKB",
    "POINTN", "POINTONSURFACE", "POLYFROMTEXT", "POLYFROMWKB", "POLYGON", "POLYGONFROMTEXT", "POLYGONFROMWKB", "POSITION",
    "POW", "POWER", "QUARTER", "QUOTE", "RADIANS", "RAND", "RELATED", "RELEASE_LOCK", "REPEAT", "REPLACE", "REVERSE",
    "RIGHT", "ROUND", "ROW_COUNT", "RPAD", "RTRIM", "SCHEMA", "SECOND", "SEC_TO_TIME", "SESSION_USER", "SHA", "SHA1",
    "SIGN", "SIN", "SLEEP", "SOUNDEX", "SPACE", "SQRT", "SRID", "STARTPOINT", "STD", "STDDEV", "STDDEV_POP",
    "STDDEV_SAMP", "STRCMP", "STR_TO_DATE", "SUBDATE", "SUBSTR", "SUBSTRING", "SUBSTRING_INDEX", "SUBTIME", "SUM",
    "SYMDIFFERENCE", "SYSDATE", "SYSTEM_USER", "TAN", "TIME", "TIMEDIFF", "TIMESTAMP", "TIMESTAMPADD", "TIMESTAMPDIFF",
    "TIME_FORMAT", "TIME_TO_SEC", "TOUCHES", "TO_DAYS", "TRIM", "TRUNCATE", "UCASE", "UNCOMPRESS", "UNCOMPRESSED_LENGTH",
    "UNHEX", "UNIQUE_USERS", "UNIX_TIMESTAMP", "UPDATEXML", "UPPER", "USER", "UTC_DATE", "UTC_TIME", "UTC_TIMESTAMP",
    "UUID", "VARIANCE", "VAR_POP", "VAR_SAMP", "VERSION", "WEEK", "WEEKDAY", "WEEKOFYEAR", "WITHIN", "X", "Y", "YEAR", "YEARWEEK"
];

export default {
    /**
     * Format the whitespace in a Standard SQL string to make it easier to read
     *
     * @param {String} query The Standard SQL string
     * @return {String} formatted string
     */
    format: (query) => {
        return new SqlFormatter({
            reservedWords,
            reservedToplevelWords,
            reservedNewlineWords,
            functionWords
        }).format(query);
    }
};

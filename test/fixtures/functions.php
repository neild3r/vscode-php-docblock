<?php

abstract class Test
{
    ////=> simple
    public function test()
    {
    }

    ////=> simple-static
    public static function test2()
    {
    }

    ////=> constructor-no-vis
    function __construct()
    {
    }

    ////=> abstract-simple
    abstract public function getName();

    ////=> abstract-static
    abstract static public function getStaticName();

    ////=> abstract-static-alt
    static abstract protected function getNameStatic();


    ////=> final-static
    final private static function getFinalPrivateName()
    {
    }

    ////=> final
    final public function getFinalName()
    {
    }

    ////=> params
    public function getParams($var, $var2, $var3)
    {
    }

    ////=> params-complex
    final protected static function getComplexParams(&$var, Hint $var2, $var3 = false)
    {
    }

    ////=> multiline
    public function getMultiline(
        $var,
        $var2,
        $var3
    ) {
    }

    ////=> multiline-complex
    final static public function getComplexMultiline(
        TypeHint $var,
        &$var2,
        $var3 = "default"
    ) {
    }

    ////=> nullable-return-type
    public function nullableReturnType(): ?string
    {
    }

    ////=> nullable-args
    public function nullableArgs(?TypeHint $var, ?\Type2 $var2, ?string $var3)
    {
    }

    ////=> param-types
    public function getParamTypes(
        TypeHint $hint,
        $boolean = true,
        $string = 'single quotes',
        $string2 = "double quotes",
        $int = 42141513,
        $float = 109.50,
        $array = [],
        $array2 = array()
    ) {
    }

    ////=> array-params
    public function arrayParams($var = array('a', array()), $var2 = array())
    {
    }

    ////=> param-namespace
    public function paramNamespaced(\TypeHint $hint, $test)
    {
    }

    ////=> param-namespace-full
    public function paramNamespacedFull(App\Model\TypeHint $hint, $test)
    {
    }

    ////=> args
    public function dotArgs(...$args) {
    }

    ////=> args-typed
    public function dotArgsTyped(int ...$args) {
    }

    ////=> args-typed-long
    public function dotArgsTypedLong(int ...$args) {
    }


    ////=> php7-return
    public function getPHP7Return(): TypeHint {
    }

    ////=> php7-return-alt
    public function getPHP7ReturnAlt():float
    {
    }

    ////=> php7-return-param
    public function getPHP7ReturnParam(float $param) :int
    {
    }

    ////=> php7-return-param-long
    public function getPHP7ReturnParamLong(float $param) :int
    {
    }

    ////=> php7-return-multiline
    public function getPHP7ReturnMultiline(
        float $param,
        bool $boolean = false
    ) : int {
    }

    ////=> php7-return-multiline-long
    public function getPHP7ReturnMultilineLong(
        float $param,
        bool $boolean = false
    ) : int {
    }

    ////=> php7-return-namespace
    public function getPHP7ReturnNamespace():\TypeHint
    {
    }

    ////=> php7-return-namespace-full
    public function getPHP7ReturnNamespaceFull():App\Model\TypeHint
    {
    }

    ////=> function-reference
    public function &someFunction()
    {
    }

    ////=> is
    public function isSomething()
    {
    }

    ////=> has
    public function hasValue()
    {
    }

    ////=> can
    public function canValue()
    {
    }

    ////=> debug-info
    public function __debugInfo()
    {
    }

    ////=> wakeup
    public function __wakeup()
    {
    }

    ////=> sleep
    public function __sleep()
    {
    }

    ////=> isset
    public function __isset($name)
    {
    }

    ////=> unset
    public function __unset($name)
    {
    }

    ////=> set
    public function __set($name, $value)
    {
    }

    ////=> to-string
    public function __toString()
    {
    }
}

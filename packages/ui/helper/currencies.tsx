export const parseNumberToCurrencyString = (value: number, locale: string = 'pt-BR') => {
    const currencyString = new Intl.NumberFormat(
        locale,
        {
            style: 'currency',
            currency: locale === 'en-US' ? 'USD' : 'BRL'
        }).format(typeof value !== 'number' ? 0 : value)

    return currencyString.replace(/\s/g, '').replace('$', '$ ')
}
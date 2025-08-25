export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price)
}

export const formatKind = (kind: string): string => {
    const kindMap: Record<string, string> = {
        'presencial': 'Presencial 🏫',
        'ead': 'EaD 🏠'
    };
    return kindMap[kind] || kind;
}

export const formatLevel = (level: string): string => {
    const levelMap: Record<string, string> = {
        'bacharelado': 'Graduação (bacharelado) 🎓',
        'tecnologo': 'Graduação (tecnólogo) 🎓',
        'licenciatura': 'Graduação (licenciatura) 🎓'   
    }
    return levelMap[level] || level;
}

export const calculateDiscountPercentage = (fullprice: number, offeredPrice: number): string => {
    const discount = ((fullprice - offeredPrice) / fullprice) * 100;
    return `${Math.round(discount)}% 📉`
}


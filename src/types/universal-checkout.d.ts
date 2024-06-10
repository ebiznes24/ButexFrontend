declare namespace Furgonetka {
    class Checkout {
        /**
         * Metoda uruchamiająca Portmonetkę.
         */
        static init(configuration: CheckoutInitConfiguration): void;
    }
}

/**
 * Lista zdarzeń.
 */
declare enum EventType {
    /**
     * Zdarzenie wywołane po utworzeniu zamówienia.
     */
    orderCreated = "ORDER_CREATED",

    /**
     * Zdarzenie wywołane przy wyświetleniu podsumowania zamówienia.
     */
    viewOrderSummary = "VIEW_ORDER_SUMMARY",
}

/**
 * Parametry funkcji wywoływanej przy określonych zdarzeniach.
 */
declare interface EventsCallbackParams {
    /**
     * Typ zdarzenia
     */
    type: EventType;

    /**
     * Dane powiązane ze zdarzeniem.
     */
    payload?: OrderCreatedEventPayload | ViewOrderSummaryEventPayload;
}

declare interface OrderEventPayload {
    orderId?: string;
}

/**
 * Dane powiązane ze zdarzeniem wywołanym po utworzeniu zamówienia.
 */
declare type OrderCreatedEventPayload = OrderEventPayload;

/**
 * Dane powiązane ze zdarzeniem wywołanym przy wyświetleniu podsumowania zamówienia.
 */
declare type ViewOrderSummaryEventPayload = OrderEventPayload;

/**
 * Dane z platformy sklepowej.
 */
declare interface CheckoutCartData {
    /**
     * Dane koszyka.
     */
    cart: CheckoutCart;

    /**
     * Dane metod dostawy.
     */
    shippingMethods: CheckoutShippingMethod[];

    /**
     * Dane metod płatności.
     */
    paymentMethods: CheckoutPaymentMethod[];
}

/**
 * Parametry inicjujące Portmonetkę.
 */
declare interface CheckoutInitConfiguration {
    /**
     * Identyfikator dostępny w ustawieniach Portmonetki w panelu Furgonetka.pl.
     */
    checkoutUuid: string,

    /**
     * Selektor kontenera przycisku.
     */
    defaultButtonContainer: string,

    /**
     * Selektor kontenera przycisku dodającego produkt do koszyka.
     */
    addProductToCartButtonContainer?: string;

    /**
     * Funkcja wywoływana przy dodawaniu produktu do koszyka.
     */
    addProductToCartCallback?: (event: Event) => Promise<boolean>;

    /**
     * Funkcja pobierająca pełne dane koszyka.
     */
    dataProviderCallback: () => Promise<CheckoutCartData>,

    /**
     * Funkcja wywoływana przy pozostałych zdarzeniach.
     */
    eventsCallback?: (params: EventsCallbackParams) => void,
}

/**
 * Dane koszyka.
 */
declare interface CheckoutCart {
    /** 
     * Identyfikator koszyka z platformy sklepowej.
     */
    id?: string | null;
    
    /** 
     * Waluta koszyka.
     */
    currency?: string;

    /**
     * Kwota zniżki.
     */
    discount?: number;

    /**
     * Informacje o zniżce.
     */
    discountInfo?: string;

    /**
     * Produkty w koszyku.
     */
    products: CheckoutCartProduct[];

    /**
     * Wartość koszyka (brutto, bez kosztów dostawy).
     */
    totalGross: number;
}

/**
 * Dane produktu w koszyku.
 */
declare interface CheckoutCartProduct {
    /**
     * Identyfikator produktu.
     */
    id: string;

    /**
     * Identyfikator stanu magazynowego.
     */
    stockId?: string | null;

    /**
     * Nazwa produktu.
     */
    name: string;

    /**
     * Ilość produktów.
     */
    quantity: number;

    /**
     * Jednostka produktu.
     */
    unit?: string|null;

    /**
     * Cena brutto (za jednostkę).
     */
    priceGross: number;

    /**
     * Adres URL zdjęcia produktu. Adres musi zawierać pełną ścieżkę (wraz z protokołem i domeną).
     */
    imageUrl?: string | null;

    /**
     * Atrybuty produktu.
     */
    attributes?: CheckoutCartProductAttribute[];
}

/**
 * Dane atrybutu produktu.
 */
declare interface CheckoutCartProductAttribute {
    /**
     * Nazwa atrybutu.
     */
    name: string;

    /**
     * Wartość atrybutu.
     */
    value: string;

    /**
     * Identyfikator atrybutu.
     */
    id?: string | null;

    /**
     * Identyfikator wartości.
     */
    valueId?: string | null;
}

/**
 * Dane metody płatności.
 */
declare interface CheckoutPaymentMethod {
    /** 
     * Identyfikator metody płatności.
     */
    id: string;

    /** 
     * Nazwa metody płatności.
     */
    name: string;

    /**
     * Typ metody płatności.
     * "cod" - płatność za pobraniem
     * "payByLink" - płatność online np. BLIK
     */
    type: "cod" | "payByLink";

    /**
     * Dostawca (provider) powiązany z metodą płatności (wymagane dla type="payByLink").
     *
     */
    provider?: PaymentMethodProviders | null;
}

/**
 * Lista dostępnych dostawców płatności.
 */
declare enum PaymentMethodProviders {
    Przelewy24 = "przelewy24",
    Payu = "payu",
    Tpay = "tpay",
}

/**
 * Dane metody dostawy.
 */
declare interface CheckoutShippingMethod {
    /**
     * Identyfikator metody dostawy.
     */
    id: string;

    /** 
    * Nazwa metody dostawy.
    */
    name: string;

    /**
     * Cena brutto.
     */
    priceGross: number;

    /**
     * Typ wysyłki.
     */
    deliveryType: "point" | "parcel_locker" | "self_pickup" | "courier";

    /**
     * Rodzaj usługi kurierskiej dostępnej w ramach metody dostawy (wymagane dla deliveryType="point"|"parcel_locker").
     */
    deliveryService?: ShippingMethodDeliveryServices | null;

    /** 
     * Lista dostępnych metod płatności w ramach danej metody dostawy.
     */
    paymentMethods: CheckoutShippingPaymentMethod[];
}

/**
 * Lista dostępnych usług kurierskich dla metod dostaw.
 */
declare enum ShippingMethodDeliveryServices {
    Inpost = "inpost",
    Orlen = "orlen",
    Ups = "ups",
    Dpd = "dpd",
    Poczta = "poczta",
    Dhl = "dhl",
    Fedex = "fedex",
}

/**
 * Dane metody płatności powiązanej z metodą dostawy.
 */
declare interface CheckoutShippingPaymentMethod {
    /** 
     * Identyfikator metody płatności.
     */
    id: string;

    /**
     * Dopłata do metody płatności.
     */
    surcharge?: number;
}

/**
 * Dane adresowe.
 */
declare interface Address {
    company: string | null;
    name: string | null;
    surname: string | null;
    street: string;
    city: string;
    postcode: string;
    county: string;
    country_code: string;
    phone: string;
    email: string;
}
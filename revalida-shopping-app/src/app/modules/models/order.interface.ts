export interface Order {
    id: string
    customer: string
    location: string
    datetime: Date
    item_name: string
    payment_mode: string
    quantity: number
    subtotal: number
    status: string
}

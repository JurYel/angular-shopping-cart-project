export interface Order {
    id: string
    datetime: Date
    customer: string
    item_name: string
    payment_mode: string
    quantity: number
    subtotal: number
    status: string
}

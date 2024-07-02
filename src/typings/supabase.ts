export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ar_customer: {
        Row: {
          contact: string | null
          credit_check_flag: boolean | null
          credit_limit: number | null
          credit_status: number | null
          currency: string | null
          current_balance: number | null
          customer_on_hold: boolean | null
          customer_type: string | null
          data_last_pay: string | null
          date_last_sale: string | null
          domain: string | null
          email: string | null
          fax: string | null
          highest_balance: number | null
          id: string
          invoice_count: number | null
          mtr_cr_memo_val: number
          name: string | null
          num_outst_ord: number | null
          outst_ord_val: number | null
          phone_ext: number | null
          phone_no: string | null
          po_number_mandatory: boolean | null
          salesperson: number | null
          ship_postal_code: string | null
          ship_to_addr1: string | null
          ship_to_addr2: string | null
          ship_to_addr3: string | null
          ship_to_addr3_loc: string | null
          ship_to_addr4: string | null
          ship_to_addr5: string | null
          short_name: string | null
          sold_postal_code: string | null
          sold_to_addr1: string | null
          sold_to_addr1_loc: string | null
          sold_to_addr2: string | null
          sold_to_addr3: string | null
          sold_to_addr4: string | null
          sold_to_addr5: string | null
        }
        Insert: {
          contact?: string | null
          credit_check_flag?: boolean | null
          credit_limit?: number | null
          credit_status?: number | null
          currency?: string | null
          current_balance?: number | null
          customer_on_hold?: boolean | null
          customer_type?: string | null
          data_last_pay?: string | null
          date_last_sale?: string | null
          domain?: string | null
          email?: string | null
          fax?: string | null
          highest_balance?: number | null
          id: string
          invoice_count?: number | null
          mtr_cr_memo_val: number
          name?: string | null
          num_outst_ord?: number | null
          outst_ord_val?: number | null
          phone_ext?: number | null
          phone_no?: string | null
          po_number_mandatory?: boolean | null
          salesperson?: number | null
          ship_postal_code?: string | null
          ship_to_addr1?: string | null
          ship_to_addr2?: string | null
          ship_to_addr3?: string | null
          ship_to_addr3_loc?: string | null
          ship_to_addr4?: string | null
          ship_to_addr5?: string | null
          short_name?: string | null
          sold_postal_code?: string | null
          sold_to_addr1?: string | null
          sold_to_addr1_loc?: string | null
          sold_to_addr2?: string | null
          sold_to_addr3?: string | null
          sold_to_addr4?: string | null
          sold_to_addr5?: string | null
        }
        Update: {
          contact?: string | null
          credit_check_flag?: boolean | null
          credit_limit?: number | null
          credit_status?: number | null
          currency?: string | null
          current_balance?: number | null
          customer_on_hold?: boolean | null
          customer_type?: string | null
          data_last_pay?: string | null
          date_last_sale?: string | null
          domain?: string | null
          email?: string | null
          fax?: string | null
          highest_balance?: number | null
          id?: string
          invoice_count?: number | null
          mtr_cr_memo_val?: number
          name?: string | null
          num_outst_ord?: number | null
          outst_ord_val?: number | null
          phone_ext?: number | null
          phone_no?: string | null
          po_number_mandatory?: boolean | null
          salesperson?: number | null
          ship_postal_code?: string | null
          ship_to_addr1?: string | null
          ship_to_addr2?: string | null
          ship_to_addr3?: string | null
          ship_to_addr3_loc?: string | null
          ship_to_addr4?: string | null
          ship_to_addr5?: string | null
          short_name?: string | null
          sold_postal_code?: string | null
          sold_to_addr1?: string | null
          sold_to_addr1_loc?: string | null
          sold_to_addr2?: string | null
          sold_to_addr3?: string | null
          sold_to_addr4?: string | null
          sold_to_addr5?: string | null
        }
        Relationships: []
      }
      ar_invoice: {
        Row: {
          currency_value: number | null
          customer_id: string
          customer_po_number: string | null
          document_type: string
          id: string
          invoice_bal1: string | null
          invoice_bal1_1: string | null
          invoice_bal3: string | null
          invoice_date: string | null
          org_disc_value: string | null
          post_currency: string | null
          salesperson: number | null
          tax_portion: string | null
          tax_status: string | null
          terms_code: string | null
        }
        Insert: {
          currency_value?: number | null
          customer_id: string
          customer_po_number?: string | null
          document_type?: string
          id: string
          invoice_bal1?: string | null
          invoice_bal1_1?: string | null
          invoice_bal3?: string | null
          invoice_date?: string | null
          org_disc_value?: string | null
          post_currency?: string | null
          salesperson?: number | null
          tax_portion?: string | null
          tax_status?: string | null
          terms_code?: string | null
        }
        Update: {
          currency_value?: number | null
          customer_id?: string
          customer_po_number?: string | null
          document_type?: string
          id?: string
          invoice_bal1?: string | null
          invoice_bal1_1?: string | null
          invoice_bal3?: string | null
          invoice_date?: string | null
          org_disc_value?: string | null
          post_currency?: string | null
          salesperson?: number | null
          tax_portion?: string | null
          tax_status?: string | null
          terms_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ar_invoice_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ar_customer"
            referencedColumns: ["id"]
          },
        ]
      }
      ar_invoice_pay: {
        Row: {
          customer_id: string
          disc_value: string | null
          document_type: string
          entry_number: number
          id: string
          journal: number | null
          journal_date: string | null
          post_currency: string | null
          referance: string | null
          sales_order: string | null
          trn_month: number | null
          trn_type: string | null
          trn_value: number | null
          trn_year: number | null
        }
        Insert: {
          customer_id: string
          disc_value?: string | null
          document_type: string
          entry_number: number
          id: string
          journal?: number | null
          journal_date?: string | null
          post_currency?: string | null
          referance?: string | null
          sales_order?: string | null
          trn_month?: number | null
          trn_type?: string | null
          trn_value?: number | null
          trn_year?: number | null
        }
        Update: {
          customer_id?: string
          disc_value?: string | null
          document_type?: string
          entry_number?: number
          id?: string
          journal?: number | null
          journal_date?: string | null
          post_currency?: string | null
          referance?: string | null
          sales_order?: string | null
          trn_month?: number | null
          trn_type?: string | null
          trn_value?: number | null
          trn_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ar_invoice_pay_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ar_customer"
            referencedColumns: ["id"]
          },
        ]
      }
      ar_invoice_reference: {
        Row: {
          customer_id: string | null
          document_type: string
          id: string
          invoice_date: string | null
          sales_order_id: string | null
        }
        Insert: {
          customer_id?: string | null
          document_type: string
          id: string
          invoice_date?: string | null
          sales_order_id?: string | null
        }
        Update: {
          customer_id?: string | null
          document_type?: string
          id?: string
          invoice_date?: string | null
          sales_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ar_invoice_reference_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "ar_customer"
            referencedColumns: ["id"]
          },
        ]
      }
      crm_contact: {
        Row: {
          assistant_name: string | null
          comment: string | null
          contact_method: string | null
          dob: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          manager_name: string | null
          office: string | null
          partner_name: string | null
          preffered_name: string | null
        }
        Insert: {
          assistant_name?: string | null
          comment?: string | null
          contact_method?: string | null
          dob?: string | null
          first_name?: string | null
          id: string
          job_title?: string | null
          last_name?: string | null
          manager_name?: string | null
          office?: string | null
          partner_name?: string | null
          preffered_name?: string | null
        }
        Update: {
          assistant_name?: string | null
          comment?: string | null
          contact_method?: string | null
          dob?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          manager_name?: string | null
          office?: string | null
          partner_name?: string | null
          preffered_name?: string | null
        }
        Relationships: []
      }
      crm_email: {
        Row: {
          domain: string | null
          email: string | null
          email_type: number
          email_type_1: string | null
          id: string
        }
        Insert: {
          domain?: string | null
          email?: string | null
          email_type: number
          email_type_1?: string | null
          id: string
        }
        Update: {
          domain?: string | null
          email?: string | null
          email_type?: number
          email_type_1?: string | null
          id?: string
        }
        Relationships: []
      }
      sor_detail_rep: {
        Row: {
          back_order_qty: string | null
          customer_request_date: string | null
          id: string
          invoice_id: string
          line_ship_date: string | null
          order_qty: number | null
          price: number | null
          sales_order_line: number
          ship_qty: number | null
          stock_code: string | null
          stock_description: string | null
          stock_qty_to_ship: number | null
          tax_code: string | null
          unit_cost: string | null
        }
        Insert: {
          back_order_qty?: string | null
          customer_request_date?: string | null
          id: string
          invoice_id: string
          line_ship_date?: string | null
          order_qty?: number | null
          price?: number | null
          sales_order_line: number
          ship_qty?: number | null
          stock_code?: string | null
          stock_description?: string | null
          stock_qty_to_ship?: number | null
          tax_code?: string | null
          unit_cost?: string | null
        }
        Update: {
          back_order_qty?: string | null
          customer_request_date?: string | null
          id?: string
          invoice_id?: string
          line_ship_date?: string | null
          order_qty?: number | null
          price?: number | null
          sales_order_line?: number
          ship_qty?: number | null
          stock_code?: string | null
          stock_description?: string | null
          stock_qty_to_ship?: number | null
          tax_code?: string | null
          unit_cost?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export interface WireTransferResponseModel {
    remark?: string;
    status?: string;
    message?: Message;
    data?: Data;
}

export interface Message {
    success?: string[];
    error?: string[];
}

export interface Data {
    setting?: Setting;
    form?: Form;
}

export interface Form {
    id?: number;
    act?: string;
    form_data?: FormData;
    created_at?: string;
    updated_at?: string;
}

export interface FormData {
    account_name?: FormModel;
    account_number?: FormModel;
    list?: FormModel[];  // Added list field
}

export interface FormModel {
    name?: string;
    label?: string;
    is_required?: string;
    extensions?: string | null;
    options?: string[];
    type?: string;
    selected_value?: any;
    file?: File | string;
    cb_selected?: string[];
}

export interface Setting {
    id?: number;
    minimum_limit?: string;
    maximum_limit?: string;
    daily_maximum_limit?: string;
    monthly_maximum_limit?: string;
    daily_total_transaction?: string;
    monthly_total_transaction?: string;
    fixed_charge?: string;
    percent_charge?: string;
    instruction?: string | null;
    created_at?: string;
    updated_at?: string;
}

// Function to parse response data and populate `list` like Flutter
export function parseFormData(formData: any): FormData {
    const parsedFormData: FormData = { list: [] };

    if (formData) {
        // If formData is an object (not an array)
        if (typeof formData === 'object') {
            Object.keys(formData).forEach((key) => {
                const e = formData[key];  // Access each field in the form_data

                const formModel: FormModel = {
                    name: e.name,
                    label: e.label,
                    is_required: e.is_required,
                    extensions: e.extensions,
                    options: e.options || [],
                    type: e.type,
                    selected_value: e.selected_value,
                    cb_selected: e.cb_selected,
                };

                parsedFormData.list?.push(formModel);
            });
        }
    }

    return parsedFormData;
}


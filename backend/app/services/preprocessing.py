import pandas as pd
import json

def prepare_input_data(data: dict) -> pd.DataFrame:
    df = pd.DataFrame([data])
    
    df.rename(columns={
        "location": "location_grouped",
        "furnishing": "Furnishing",
        "transaction": "Transaction",
        "ownership": "Ownership",
        "facing": "facing"
    }, inplace=True)
    
    feature_columns = [
        "carpet_area_sqft", "floor_num", "bathroom", "balcony",
        "location_grouped", "Furnishing", "Transaction", "Ownership", "facing"
    ]
    
    for col in feature_columns:
        if col not in df.columns:
            df[col] = "Unknown" if col in ["location_grouped", "Furnishing", "Transaction", "Ownership", "facing"] else 0
            
    return df[feature_columns]
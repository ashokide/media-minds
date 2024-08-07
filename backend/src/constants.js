const getSlideData = (mockData, startDate, endDate) => `${mockData}
Please extract the following data as JSON format from the provided mock API for the date from ${startDate} to ${endDate}:

- AdQuarter: current quarter of entered timerangeprompt like Q1 or Q2 or Q3 or Q4
- Total Investment: The total amount spent in all campaigns in the mock API.  
- Total Views: The number of impressions in all campaigns in the mock API.  
- Total CPPV (Cost Per Page View): The total CPPV is Total_Investment / Total_Views in the mock API.  
- Total CPDA (Cost Per Desired Action): The total of cpda in the mock API.  
- Investment by Platform: A breakdown of investment by platform, including:  
  - Facebook: Total spend and percentage of the total investment.  
  - YouTube: Total spend and percentage of the total investment.  
  - Reddit: Total spend and percentage of the total investment.  
  - LinkedIn: Total spend and percentage of the total investment.  
  - Quora: Total spend and percentage of the total investment.  
- Overall Insights: Provide a description on overall descriptive analysis, key insight to understand the result and take better action ,recommend cost-effective actions for driving more sales? (note: dont give time/date/month) for the entered timerangeprompt.
- Overall ENGAGEMENT Insight: Provide a description on ENGAGEMENT Campaign by analyzing the actual return, understand the result and take better action.
- Highest Performing Campaign:  
  - Campaign_id: The ID of the highest performing campaign.  
  - What: "platform name was" followed by descriptions of their performance, creative, and metrics.  
  - Why: A key insight about the campaign to understand the result and take better action.  
- Honorable Mention:  
  - Campaign_id: The ID of the honorable mention campaign.  
  - What: "platform name was" followed by descriptions of their performance, creative, and metrics.  
  - Why: A key insight about the campaign to understand the result and take better action.  
- Lowest Performing Campaign:  
  - Campaign_id: The ID of the lowest performing campaign.  
  - What: "platform name was" followed by descriptions of their performance, creative, and metrics.  
  - Why: A key insight about the campaign to understand the result and take better action. 

  
Note: Dont Provide any ID's.

The JSON format should look like this:  
{  
    "Quarter":<value>,
    "Total_Investment": <value>,  
    "Total_Views": <value>,  
    "CPPV": <value>,  
    "CPDA": <value>,  
    "Investment_by_Platform": {  
        "Facebook": {  
            "Total_Spend": <value>,  
            "Percentage_of_Total_Investment": <value>  
        },  
        "YouTube": {  
            "Total_Spend": <value>,  
            "Percentage_of_Total_Investment": <value>  
        },  
        "Reddit": {  
            "Total_Spend": <value>,  
            "Percentage_of_Total_Investment": <value>  
        },  
        "LinkedIn": {  
            "Total_Spend": <value>,  
            "Percentage_of_Total_Investment": <value>  
        },  
        "Quora": {  
            "Total_Spend": <value>,  
            "Percentage_of_Total_Investment": <value>  
        }  
    },  
    "overall_insight": <value>,
    "overall_engagement":{
      "platform_name":[name of platfrom has heigest actual return],
      "description":[Overall ENGAGEMENT Insight]
    },
    "highest_performing_campaign": {  
        "Campaign_id": <value>,
        "platform_name":  [platform name],
        "what": "[platform name] was [Descriptions] of their performance, creative, and metrics",  
        "why": "Key insight about the campaign to understand the result and take better action"  
    },  
    "honorable_mention": {  
        "Campaign_id": <value>,  
        "what": "[platform name] was [Descriptions] of their performance, creative, and metrics",  
        "why": "Key insight about the campaign to understand the result and take better action"  
    },  
    "lowest_performing_campaign": {  
        "Campaign_id": <value>,  
        "what": "[platform name] was [Descriptions] of their performance, creative, and metrics",  
        "why": "Key insight about the campaign to understand the result and take better action"  
    },
    
    "platform_insights": {
        "<platform_name_value>": {
            "platformSpend": "<total_spend_on_this_platform>",  
            "platformCppv": "<total_cppv_on_this_platform>",  
            "actualReturn": "<total_spend_on_this_platform / total_cppv_on_this_platform>",
            "plaformDa": "<total_da_on_this_platform>",
            "platfromCpda": "<total_cpda_on_this_platform>",
            "pillar_insight":{
              "<pillar_id>": {
                "pillar_name": "<piller_name_value>",  
                "pillar_spend": "<total_spend_on_this_pillar>",  
                "pillar_cppv": "<total_cppv_on_this_pillar>",  
                "pillar_actualReturn": "<total_spend_on_this_pillar> / <total_cppv_on_this_pillar>",
                "pillarDa": "<total_da_on_this_pillar>",
                "pillarCpda": "<total_cpda_on_this_pillar>"  
               }
            } 
        }
    }

 
}`;

module.exports = {
  getSlideData,
};

import wikipedia
import wolframalpha
# Replace with your Wolfram Alpha App ID
APP_ID = "YOUR_APP_ID"
# Create Wolfram Alpha client
client = wolframalpha.Client(APP_ID)
def virtual_assistant(query):
    try:
        # Try Wolfram Alpha first
        res = client.query(query)
        answer = next(res.results).text
        print("\nWolfram Alpha Answer:")
        print(answer)
    except:
        try:
            # If Wolfram Alpha fails, search Wikipedia
            print("\nSearching Wikipedia...")
            summary = wikipedia.summary(query, sentences=3)
            print("\nWikipedia Summary:")
            print(summary)
        except wikipedia.exceptions.DisambiguationError as e:
            print("\nMultiple results found. Suggestions:")
            print(e.options[:5])
        except wikipedia.exceptions.PageError:
            print("\nNo Wikipedia page found.")
        except Exception as e:
            print("\nError:", e)
# Main Program
while True:
    query = input("\nAsk me anything (or type 'exit'): ")
    if query.lower() == "exit":
        print("Goodbye!")
        break
    virtual_assistant(query)
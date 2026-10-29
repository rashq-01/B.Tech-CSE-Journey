# # X824AEQ9EQ

# import wikipedia
# import wolframalpha

# APP_ID = "X824AEQ9EQ"

# client = wolframalpha.Client(APP_ID)

# def virtual_assistant(query):
#     try:
#         res = client.query(query)
#         answer = next(res.results).text

#         print(f"\nWolfram Alpha Answer : {answer}")

#     except Exception:
#         try:
#             print("\Searching on Wikipedia.....")
#             summary = wikipedia.summary(query,sentences=3)

#             print(f"\nWikipedia Summary : {summary}")

#         except wikipedia.exceptions.DisambiguationError as e:
#             print(f"\nMultiple results found : {e.options[:5]}")
#         except wikipedia.exceptions.PageError:
#             print(f"\nNo Wikipedia page Found.")
#         except Exception as e:
#             print(f"\nError : {e}")


# # Main program

# while True:
#     query = input("\nAsk me anything (or type 'exit') : ")

#     if(query.lower() == "exit"):
#         print("Goodbye!")
#         break

#     virtual_assistant(query)




import wolframalpha
import wikipedia

APP_ID = "23242234"

client = wolframalpha.Client(APP_ID)

def virtual_assistant(qry):
    try:
        res = client.query(qry)
        ans = next(res.results).text
        print(f"WolframAlpha answered : {ans}")
        return
    except Exception:
        try:
            print(f"Searching on wikipedia...")
            summary = wikipedia.summary(qry,sentences=5)
            print(f"Wikipedia answered : {summary}")
            return
        except Exception as e:
            print(f"Error : {e}")
            return






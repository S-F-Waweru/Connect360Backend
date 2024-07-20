from django.shortcuts import render
from django.http import HttpResponse
from PyPDF2 import PdfReader
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationRetrievalChain
# Create your views here.
def index(request):
    return HttpResponse('This is the First End Point')


# Ai Chats functions

# 1. Incident Summerize
def summerize_incidents(request):
    pass

# 2. Views Summerize
def summerize_views(request):
    pass

# 3. Chatting with PDF
def ai_chat(request):
    pass

#       3.1 Get Pdf 
#       3.2 Get Text Stream
#       3.3 Get Text chunks
#       3.4 Vector Store


from AIHelpers.utils import get_pdf_text, get_text_chunks, get_vectorstore, get_consversation_chain

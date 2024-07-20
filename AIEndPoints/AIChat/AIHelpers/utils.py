#funvtions For pdf and  Database chat
def get_pdf_text(pdf): 
    text =''
    pdf_reader = PdfReader(pdf)
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text


def get_text_chunks(text):
    text_splitter = CharacterTextSplitter(
       separator="\n",
        chunk_size = 1000,
        chunk_overlap = 200,
        length_function= len
    )
    chunks = text_splitter.spit_text(text)
    return chunks

def get_vectorstore(text_chunks):
    embeddings = OpenAIEmbeddings()
    vectorstore = FAISS.from_texts(text=text_chunks, embedding=embeddings)
    return vectorstore

def get_consversation_chain(vectorstore):
    llm = ChatOpenAI()
    memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)
    conversation_chain = ConversationRetrievalChain.from_llm(
        llm= llm,
        retriever= vectorstore.as_retriever(),
        memory = memory
    )
    return conversation_chain
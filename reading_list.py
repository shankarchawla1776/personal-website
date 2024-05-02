from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, Frame

def create_reading_list(books, filename):
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter
    styles = getSampleStyleSheet()
    frame_width = width - 100  

    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(width / 2, height - 50, "Reading List")
    c.line(50, height - 58, width - 50, height - 58)  

    title_frame = Frame(50, 50, 200, height - 100, leftPadding=10, bottomPadding=10, rightPadding=10, topPadding=10, showBoundary=0)
    author_frame = Frame(250, 50, 200, height - 100, leftPadding=10, bottomPadding=10, rightPadding=10, topPadding=10, showBoundary=0)
    notes_frame = Frame(450, 50, 150, height - 100, leftPadding=10, bottomPadding=10, rightPadding=10, topPadding=10, showBoundary=0)

    title_story = [Paragraph('<b>Title</b>', styles['Heading3'])]
    author_story = [Paragraph('<b>Author</b>', styles['Heading3'])]
    notes_story = [Paragraph('<b>Notes</b>', styles['Heading3'])]

    for book in books:
        title_story.append(Paragraph(book['title'], styles['BodyText']))
        author_story.append(Paragraph(book['author'], styles['BodyText']))
        notes_story.append(Paragraph(book['notes'], styles['BodyText']))

    title_frame.addFromList(title_story, c)
    author_frame.addFromList(author_story, c)
    notes_frame.addFromList(notes_story, c)

    c.save()


books = [
    {'title': 'SWE-Bench: Can Language Models Resolve Real-World GitHub Issues?', 'author': 'Jimenez et al., 2024', 'notes': 'Interesting paper showing potential applications for popular cognitive architectures.'},

]

create_reading_list(books, 'reading_list.pdf')

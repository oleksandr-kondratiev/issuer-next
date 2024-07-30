import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

self.onmessage = async function (e) {
  const { issue } = e.data;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { width, height } = page.getSize();
  const fontSize = 12;
  const margin = 50;
  const contentWidth = width - 2 * margin;

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const wrapText = (text, maxWidth, font, size) => {
    const paragraphs = text.split("\n");
    let lines = [];

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(" ");
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine + word + " ";
        const testWidth = font.widthOfTextAtSize(testLine, size);
        if (testWidth > maxWidth && currentLine !== "") {
          lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine = testLine;
        }
      });

      lines.push(currentLine.trim());
    });

    return lines;
  };

  const drawText = (text, x, y) => {
    const lines = wrapText(text, contentWidth, timesRomanFont, fontSize);
    lines.forEach((line) => {
      page.drawText(line, {
        x,
        y,
        size: fontSize,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    });
    return y;
  };

  let yPosition = height - margin;
  yPosition = drawText(`Issue ID: ${issue.id}`, margin, yPosition);
  yPosition = drawText(`Title: ${issue.title}`, margin, yPosition - 20);
  yPosition = drawText(`Status: ${issue.status}`, margin, yPosition - 20);
  yPosition = drawText(
    `Assigned User: ${issue.assignedUser?.name || "Unassigned"}`,
    margin,
    yPosition - 20
  );
  yPosition = drawText(
    `Created At: ${new Date(issue.createdAt).toLocaleString()}`,
    margin,
    yPosition - 20
  );
  yPosition = drawText(
    `Updated At: ${new Date(issue.updatedAt).toLocaleString()}`,
    margin,
    yPosition - 20
  );
  yPosition = drawText(
    `Last Visited: ${new Date(issue.lastVisited).toLocaleString()}`,
    margin,
    yPosition - 20
  );
  yPosition = drawText(`Description:`, margin, yPosition - 20);
  yPosition = drawText(issue.description, margin, yPosition - 20);

  const pdfBytes = await pdfDoc.save();
  self.postMessage(pdfBytes);
};

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, LevelFormat, BorderStyle, PageNumber,
  Header, Footer, WidthType, Table, TableRow, TableCell, ShadingType
} = require('docx');
const fs = require('fs');

const BLUE = "1F4E79", DARK = "1A1A1A", ACCENT = "2E75B6", GREEN = "1E5631";

function h1(t) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1, spacing: { before: 300, after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 4 } },
    children: [new TextRun({ text: t, bold: true, color: BLUE, size: 30, font: "Arial" })]
  });
}
function Q(t) {
  return new Paragraph({
    spacing: { before: 200, after: 8 },
    border: { left: { style: BorderStyle.SINGLE, size: 20, color: ACCENT, space: 8 } },
    shading: { fill: "EBF3FB", type: ShadingType.CLEAR },
    indent: { left: 200 },
    children: [new TextRun({ text: "Q: " + t, bold: true, color: "1F4E79", size: 23, font: "Arial" })]
  });
}
function Ans() {
  return new Paragraph({
    spacing: { before: 90, after: 30 }, indent: { left: 200 },
    children: [new TextRun({ text: "Answer:", bold: true, color: GREEN, size: 22, font: "Arial" })]
  });
}
function ans(t) {
  return new Paragraph({
    spacing: { before: 30, after: 70 }, indent: { left: 380 },
    children: [new TextRun({ text: t, size: 22, font: "Arial", color: DARK })]
  });
}
function body(t) {
  return new Paragraph({
    spacing: { before: 70, after: 70 },
    children: [new TextRun({ text: t, size: 22, font: "Arial", color: DARK })]
  });
}
function sub(t) {
  return new Paragraph({
    spacing: { before: 130, after: 50 },
    children: [new TextRun({ text: t, bold: true, size: 22, font: "Arial", color: "1F3864" })]
  });
}
function bul(t) {
  return new Paragraph({
    numbering: { reference: "bul", level: 0 }, spacing: { before: 36, after: 36 },
    children: [new TextRun({ text: t, size: 22, font: "Arial", color: DARK })]
  });
}
function num(t) {
  return new Paragraph({
    numbering: { reference: "nums", level: 0 }, spacing: { before: 36, after: 36 },
    children: [new TextRun({ text: t, size: 22, font: "Arial", color: DARK })]
  });
}
function sp() { return new Paragraph({ spacing: { before: 30, after: 30 }, children: [new TextRun("")] }); }
function hr() {
  return new Paragraph({
    spacing: { before: 160, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC", space: 1 } },
    children: [new TextRun("")]
  });
}
function mkTable(headers, rows) {
  const total = 9360;
  const colW = Math.floor(total / headers.length);
  const brd = { style: BorderStyle.SINGLE, size: 1, color: "AAAAAA" };
  const borders = { top: brd, bottom: brd, left: brd, right: brd };
  function cell(text, isH) {
    return new TableCell({
      borders, width: { size: colW, type: WidthType.DXA },
      shading: isH ? { fill: "D5E8F0", type: ShadingType.CLEAR } : { fill: "FFFFFF", type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 110, right: 110 },
      children: [new Paragraph({ children: [new TextRun({ text: String(text), bold: isH, size: 20, font: "Arial" })] })]
    });
  }
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: Array(headers.length).fill(colW),
    rows: [
      new TableRow({ children: headers.map(h => cell(h, true)) }),
      ...rows.map(r => new TableRow({ children: r.map(c => cell(c, false)) }))
    ]
  });
}
function diag(lines) {
  return lines.map(l => new Paragraph({
    spacing: { before: 3, after: 3 }, indent: { left: 400 },
    children: [new TextRun({ text: l, size: 19, font: "Courier New", color: "1F4E79" })]
  }));
}

const doc = new Document({
  numbering: {
    config: [
      { reference: "bul", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "nums", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal",
        run: { size: 30, bold: true, font: "Arial", color: BLUE },
        paragraph: { spacing: { before: 300, after: 120 }, outlineLevel: 0 } }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 }
      }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 4 } },
        children: [new TextRun({ text: "Design Thinking and Innovation – UNIT I: Complete Question Bank Answers", bold: true, size: 20, color: BLUE, font: "Arial" })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: ACCENT, space: 4 } },
        children: [
          new TextRun({ text: "Sri Venkateswara College of Engineering  |  Design Thinking & Innovation – Unit I  |  Page ", size: 18, color: "888888", font: "Arial" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 18, color: "888888", font: "Arial" })
        ]
      })] })
    },
    children: [

// ─── TITLE ───
new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 100, after: 60 },
  children: [new TextRun({ text: "DESIGN THINKING AND INNOVATION", bold: true, size: 40, font: "Arial", color: BLUE })] }),
new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 40 },
  children: [new TextRun({ text: "UNIT – I  |  Complete Question Bank Answers", size: 26, font: "Arial", color: "555555", italics: true })] }),
new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 260 },
  children: [new TextRun({ text: "Design Elements | Design Principles | Design Thinking | New Materials", size: 22, font: "Arial", color: "888888" })] }),

// ════════════════════════════════
// PART-A  2 MARKS
// ════════════════════════════════
h1("PART – A: 2-Mark Questions & Answers"), sp(),

Q("1. What is meant by design?  [CO1 | L1]"), Ans(),
ans("Design is the purposeful process of planning, creating, and arranging visual elements, structures, or products to solve a problem or achieve a specific goal. It involves making deliberate decisions about how something looks, feels, and functions. Design is found everywhere in daily life — from the layout of a book page, to the shape of a chair, to the logo of a company. Good design combines creativity with functionality to produce something that is both useful and visually appealing."),
hr(),

Q("2. Define design thinking.  [CO1 | L1]"), Ans(),
ans("Design thinking is a human-centered, creative problem-solving approach that focuses on deeply understanding the needs of the user before jumping to solutions. It follows an iterative process of Empathize, Define, Ideate, Prototype, and Test. Rather than starting with technology or business constraints, design thinking starts with the human being and works outward. It encourages experimentation, learning from failure, and generating many ideas before selecting the best solution."),
hr(),

Q("3. What is a dot in basic design?  [CO1 | L1]"), Ans(),
ans("A dot is the most fundamental and simplest element in design. It is a small, circular mark that has no dimensions — no length and no width — just a position in space. Despite its simplicity, a dot is powerful: it creates a focal point, draws the viewer's eye, and can suggest direction when arranged in a sequence. In design, dots are used to create texture, patterns, shading, and visual rhythm. For example, a series of dots arranged in a row suggests movement or flow."),
hr(),

Q("4. What is a line? Mention one use of line in design.  [CO1 | L1]"), Ans(),
ans("A line is a fundamental design element formed by connecting two or more dots. It has length and direction but no width. Lines can be straight, curved, diagonal, zigzag, horizontal, or vertical. They are one of the most versatile elements in design. One important use of a line in design is to create separation and organization — for example, horizontal lines are used in newspaper layouts to divide columns and sections, making the content easier to read and navigate."),
hr(),

Q("5. What is meant by shape in design?  [CO1 | L1]"), Ans(),
ans("A shape in design is a two-dimensional, flat area enclosed by a boundary (outline). Shapes have length and width but no depth. They are created when a line meets itself to enclose a space. Shapes are classified into two types: Geometric shapes (regular, mathematical forms like circles, squares, triangles, and rectangles) and Organic shapes (irregular, free-form shapes found in nature like the outline of a leaf, a cloud, or a person's silhouette). Shapes are used to create structure, convey meaning, and organize visual information."),
hr(),

Q("6. Define form in design.  [CO1 | L1]"), Ans(),
ans("Form is a three-dimensional design element that has length, width, and depth (height). While a shape is flat (2D), a form is solid (3D) and occupies actual space. A circle is a shape; a sphere is a form. A square is a shape; a cube is a form. Forms can be geometric (cube, cylinder, cone, sphere) or organic (natural, irregular 3D shapes like a rock or a human body). In design, form is used in product design, architecture, and sculpture to create objects that can be held, walked around, and experienced from multiple angles."),
hr(),

Q("7. What are elements of design? Name any two.  [CO1 | L1]"), Ans(),
ans("Elements of design are the fundamental building blocks or visual components that a designer uses to create any design work. They are the basic raw materials of design, just like letters are the raw materials of writing. Every design — whether a poster, a website, or a building — is built from these elements. Two important elements of design are: 1. Line – a path between two points that creates boundaries, guides the eye, and adds structure. 2. Color – the visual property of light that creates emotional responses, establishes mood, and draws attention in a design."),
hr(),

Q("8. What are principles of design?  [CO1 | L1]"), Ans(),
ans("Principles of design are the guidelines or rules that govern how the elements of design (line, shape, color, texture, etc.) are arranged and used together to create an effective, visually pleasing, and well-organized design. If elements of design are the 'ingredients,' the principles are the 'recipe' for combining those ingredients successfully. The principles help designers make decisions about layout, composition, and visual hierarchy. Key principles include balance, contrast, emphasis, repetition, alignment, proximity, and unity."),
hr(),

Q("9. Mention any two principles of design.  [CO1 | L2]"), Ans(),
ans("1. Balance: Balance refers to the equal distribution of visual weight in a design so that no one part dominates or feels heavier than another. There are two types: Symmetrical balance (mirror-image arrangement on both sides, creating a formal and stable feeling) and Asymmetrical balance (different elements on each side that still feel visually equal due to differences in size, color, or texture). Example: A webpage with a large image on the left balanced by text and smaller images on the right. 2. Contrast: Contrast means placing opposite or very different elements next to each other to make them stand out and create visual interest. Contrast is achieved through differences in color (black vs white), size (large vs small), shape (angular vs round), or texture (smooth vs rough). It helps highlight the most important parts of a design."),
hr(),

Q("10. What are new materials used in modern industries?  [CO1 | L1]"), Ans(),
ans("New materials in modern industries are advanced, engineered substances developed through scientific research to provide superior properties compared to traditional materials. They enable innovation in products and processes. Examples include: 1. Carbon Fiber Composites – extremely strong yet very light materials used in aerospace, sports equipment, and automobiles. 2. Graphene – a one-atom-thick layer of carbon that is the strongest material ever tested, used in electronics and sensors. 3. Smart Materials – materials that respond to changes in the environment (temperature, electric field) such as shape-memory alloys and piezoelectric materials."),
hr(),

// ════════════════════════════════
// PART-B  10 MARKS
// ════════════════════════════════
h1("PART – B: 10-Mark Questions & Answers"), sp(),

// ─── B1 ───
Q("1. Explain the concept of design and its importance in daily life.  [CO1 | L2]"), Ans(),
sp(),
sub("What is Design?"),
body("Design is the intentional and creative process of planning, conceiving, and executing a solution to a problem or an idea in a way that is both functional and visually meaningful. The word 'design' comes from the Latin word 'designare,' which means to designate, mark out, or plan. Design is not just about making things look attractive — it is fundamentally about making things work better, feel better, and communicate more clearly. Every human-made object, from a simple spoon to a complex aircraft, is the result of design."),
sp(),
body("Design exists at the intersection of art, science, engineering, and psychology. A well-designed product serves its purpose efficiently, is safe and comfortable to use, is visually appealing, and communicates its function clearly without requiring an instruction manual."),
sp(),
sub("Types of Design"),
bul("Visual/Graphic Design: Designing communication through visual elements — logos, posters, advertisements, book covers, websites."),
bul("Product/Industrial Design: Designing physical objects for use — furniture, appliances, automobiles, tools."),
bul("Interior Design: Planning and designing the aesthetic and functional layout of indoor spaces."),
bul("Fashion Design: Creating clothing, footwear, and accessories."),
bul("Architectural Design: Designing buildings and built environments."),
bul("UX/UI Design: Designing digital user interfaces and user experiences for apps and websites."),
bul("Environmental/Sustainability Design: Designing products and processes to minimize environmental impact."),
sp(),
sub("Importance of Design in Daily Life"),
sp(),
sub("1. Usability and Functionality"),
body("Good design makes everyday products easy to use. The shape of a toothbrush handle is designed to fit comfortably in the human hand. The layout of a car dashboard places the most critical controls within easy reach without requiring the driver to look away from the road. Door handles are designed so that you instinctively know whether to push or pull. Every time you use a product without thinking about how to use it, good design is at work."),
sp(),
sub("2. Safety"),
body("Design saves lives. The crumple zones in a car are designed to absorb impact energy in a crash, protecting the passengers. Traffic signs use specific shapes, colors, and symbols designed for instant recognition even in poor visibility. Medicine bottles have child-resistant caps designed to prevent accidents. Road layouts are designed to minimize collision points. Safety is one of the most critical considerations in responsible design."),
sp(),
sub("3. Communication"),
body("Design is a powerful communication tool. A well-designed logo instantly communicates the values and identity of a brand without words. Color choices in design carry emotional meaning: red conveys urgency or danger, green suggests health or nature, blue communicates trust and stability. Typography choices (the style of letters) influence whether a message feels formal or playful, modern or traditional. Effective design communicates meaning faster and more universally than text alone."),
sp(),
sub("4. Emotional Well-being and Aesthetics"),
body("The design of our environments profoundly affects how we feel. A cluttered, poorly lit room makes people feel anxious and uncomfortable. A well-designed space with natural light, harmonious colors, and ergonomic furniture promotes calmness and productivity. The beautiful design of a watch, a piece of jewelry, or a piece of furniture gives the owner pleasure and pride of ownership. Aesthetics — the quality of beauty in design — is not a luxury; it is a human need."),
sp(),
sub("5. Economic Value"),
body("Good design creates significant economic value. Companies like Apple have demonstrated that superior product design can command premium prices and build fierce customer loyalty. The design of retail store interiors influences how long customers browse and how much they buy. Packaging design influences purchase decisions at the point of sale. Nations with strong design capabilities (Scandinavia, Germany, Japan) are renowned for the quality of their manufactured goods and command higher prices in global markets."),
sp(),
sub("6. Social Impact"),
body("Design can solve major social problems. Affordable, easy-to-assemble housing designs address the global housing shortage. Low-cost, portable water purification devices designed for the developing world save millions of lives. Inclusive design (or universal design) ensures that products and environments are usable by people of all abilities, ages, and sizes. Design thinking is increasingly applied to complex social challenges in healthcare, education, and government services."),
sp(),
sub("7. Environmental Sustainability"),
body("Conscious design can protect the environment. Sustainable design minimizes waste, uses renewable materials, reduces energy consumption, and designs products for disassembly and recycling at end of life. The shift from disposable packaging to reusable containers, from fossil-fuel vehicles to electric vehicles, from single-use plastics to biodegradable materials — all of these transitions are fundamentally design transformations."),
sp(),
sub("Conclusion"),
body("Design is present in every aspect of human life. From the moment we wake up (the design of our alarm clock, bedroom furniture, bathroom fittings) to the moment we sleep (the design of our mattress, pillow, and bedroom lighting), we are surrounded by and benefit from thousands of design decisions. Good design improves quality of life, solves problems, creates beauty, and drives human progress. Design is not decoration — it is the thoughtful arrangement of the world we live in."),
hr(),

// ─── B2 ───
Q("2. Explain the basic elements of design with simple examples.  [CO1 | L2]"), Ans(),
sp(),
sub("Introduction"),
body("Elements of design are the fundamental visual components that designers use to create any work of design — whether it is a poster, a website, a building, or a product. They are the building blocks of every visual composition, just as letters are the building blocks of words. Understanding design elements is essential before learning how to use them effectively. There are seven core elements of design."),
sp(),
sub("1. Dot (Point)"),
body("The dot is the most basic element — a single mark in space with no dimensions except position. It is the starting point of all visual design. When multiple dots are placed together, they can create textures, patterns, lines (implied), or suggest movement."),
body("Example: In pointillism art (like Georges Seurat's paintings), tiny dots of pure color are placed close together to create complete images when viewed from a distance. In printing, the halftone process uses patterns of tiny dots to reproduce photographs."),
...diag([
  "  Single dot:  .            Pattern of dots creates texture:",
  "                            . . . . . . . .",
  "                            . . . . . . . .",
  "  Three dots suggest        . . . . . . . .",
  "  movement/direction:       (texture effect)",
  "  .   .    .   .   .",
]),
sp(),
sub("2. Line"),
body("A line is a series of connected dots extending from one point to another. Lines have direction (horizontal, vertical, diagonal, curved) and can convey different emotions and meanings. Horizontal lines suggest calmness and stability. Vertical lines suggest strength and height. Diagonal lines suggest movement and energy. Curved lines suggest grace and flow."),
body("Example: Architects use vertical lines in skyscraper design to emphasize height. Road markings use horizontal lines to organize traffic lanes. Fashion designers use vertical stripes in clothing to create an illusion of height."),
sp(),
sub("3. Shape"),
body("A shape is a two-dimensional enclosed area. Shapes are flat — they have length and width but no depth. They are created when a line joins its endpoints to enclose space."),
bul("Geometric shapes: Circle, square, triangle, rectangle — precise, mathematical, man-made feeling."),
bul("Organic shapes: Irregular, free-form shapes — natural, approachable, soft feeling."),
body("Example: The circular shape of a clock face is universally understood as representing time. Triangular road signs are used for warnings because the shape naturally draws attention. Company logos use specific shapes deliberately — oval shapes (like Toyota's logo) suggest elegance and movement."),
sp(),
sub("4. Form"),
body("Form is the three-dimensional equivalent of shape. While a shape is 2D and flat, a form has length, width, and height — it occupies actual space. Forms can be solid (a cube, a sphere) or implied (using shading in a 2D drawing to suggest three dimensions)."),
body("Example: A ceramic mug is a form (cylinder with a handle attachment). The Sydney Opera House is a famous architectural form with its distinctive shell-shaped roofs. Product designers must consider form carefully — the form of a car affects both its aerodynamics (function) and its visual attractiveness (aesthetics)."),
sp(),
sub("5. Color"),
body("Color is one of the most powerful and emotive elements of design. It is the visual perception produced by different wavelengths of light. Color has three properties: Hue (the actual color name — red, blue, green), Saturation (how intense or pure the color is), and Value (how light or dark the color is). Color theory describes the relationships between colors on the color wheel."),
bul("Warm colors (red, orange, yellow): Suggest energy, warmth, excitement, urgency."),
bul("Cool colors (blue, green, purple): Suggest calmness, trust, nature, stability."),
body("Example: Red is used in stop signs and fire warnings because it triggers alertness. Banks and financial institutions often use blue (stability, trust) in their branding. Fast food restaurants use red and yellow because these colors stimulate appetite and urgency."),
sp(),
sub("6. Texture"),
body("Texture describes the surface quality of a design — how something feels (tactile texture) or appears to feel (visual texture). Texture adds depth, interest, and realism to a design. In 2D design, visual texture is created through patterns, shading, and photographic images."),
body("Example: The rough, grainy texture of recycled paper packaging communicates an eco-friendly, natural brand identity. The smooth, glossy texture of high-end cosmetic packaging communicates luxury. Website designs use subtle textured backgrounds to add visual depth."),
sp(),
sub("7. Space"),
body("Space is the area within, around, above, below, or between other design elements. Positive space is the area occupied by the main elements. Negative space (or white space) is the empty area around them. Both are equally important."),
body("Example: Apple's minimalist design aesthetic uses large amounts of white space (empty space) on product pages and in packaging to convey simplicity, premium quality, and focus on the product. Typography design uses spacing between letters (tracking), between lines (leading), and between words to control readability."),
sp(),
sub("Summary Table"),
mkTable(
  ["Element","Dimension","Simple Example"],
  [
    ["Dot","Position only","Bullet point, full stop"],
    ["Line","1D – length and direction","Underline, road marking, graph axis"],
    ["Shape","2D – length and width","Circle logo, square button, triangular sign"],
    ["Form","3D – length, width, depth","Coffee mug, car body, building structure"],
    ["Color","Light wavelength","Red stop sign, blue sky, green nature"],
    ["Texture","Surface quality","Rough stone wall, smooth glass, woven fabric"],
    ["Space","Area around elements","White space on Apple website, margin in book"],
  ]
),
hr(),

// ─── B3 ───
Q("3. Describe dot, line, shape, and form as fundamental design components.  [CO1 | L1]"), Ans(),
sp(),
sub("Introduction"),
body("Dot, line, shape, and form are considered the four most fundamental building blocks of all visual design. They represent a progression from the simplest possible element (a point with no dimensions) to the most complex (a solid object in three-dimensional space). Every design, no matter how complex, is ultimately composed of these four components."),
sp(),
sub("1. Dot — The Most Basic Element"),
body("The dot is the simplest and most elementary mark in design. It is a single point in space — it has a position but technically has no dimensions (no length or width). In practical terms, a dot appears as a small, circular mark. Despite its simplicity, the dot carries surprising visual power."),
sp(),
body("Visual Properties of Dots:"),
bul("A single dot immediately draws the eye — it creates a focal point on any surface."),
bul("Multiple dots together can imply a line (when arranged in a row) or a shape (when arranged in a boundary)."),
bul("A dot surrounded by empty space feels isolated; a dot surrounded by other dots feels connected."),
bul("Varying the size, spacing, and arrangement of dots can create texture, depth, and tonal gradation."),
sp(),
...diag([
  "  Visual Effects of Dots:",
  "  Single dot        Dots in a row         Dots creating tone",
  "  (focal point)     (implied line)        (shading effect)",
  "                                          . .  .   .    .",
  "      .             .  .  .  .  .        . .  . .  . .  . .",
  "                                         . .. ...  .... .....",
]),
sp(),
body("Real-world Design Uses of Dots: QR codes use patterns of dots to encode information. Halftone printing reproduces photographs using dots of varying sizes. Pointillist paintings (Seurat) create full color images from colored dots. LED displays are arrays of light-emitting dots."),
sp(),
sub("2. Line — The Foundation of Structure"),
body("A line is created when a dot moves through space, leaving a trail. In practical terms, a line connects two or more points and has length and direction, but minimal width. Lines are probably the most versatile of all design elements — they can define boundaries, suggest movement, create patterns, and organize information."),
sp(),
body("Types of Lines and Their Meanings:"),
mkTable(
  ["Type of Line","Visual Character","Emotional Association","Design Use"],
  [
    ["Horizontal","Lies flat, stable","Rest, calm, peace","Horizon landscapes, newspaper columns"],
    ["Vertical","Stands upright","Strength, height, authority","Skyscrapers, formal columns, flagpoles"],
    ["Diagonal","Tilted at angle","Movement, tension, energy","Sports design, action graphics"],
    ["Curved","Smooth arc or wave","Grace, flow, gentleness","Nature themes, feminine design"],
    ["Zigzag","Sharp alternating angles","Excitement, electricity, danger","Warning signs, action comics"],
    ["Dashed","Broken segments","Boundary suggestion, movement","Maps, road markings, borders"],
  ]
),
sp(),
body("Functions of Line in Design: Outlines — define the boundary of a shape. Contour lines — show the three-dimensional form of an object through graduated lines. Hatching/cross-hatching — create tone and texture through parallel or crossed lines. Leading lines — direct the viewer's gaze toward a focal point in a composition. Dividers — separate different sections of a layout."),
sp(),
sub("3. Shape — Enclosed Two-Dimensional Space"),
body("A shape is formed when a line (or multiple lines) closes upon itself to enclose a two-dimensional area. Shapes are flat — they exist in two dimensions (length and width) but have no depth. Everything that has a defined boundary in a design is a shape."),
sp(),
body("Classification of Shapes:"),
bul("Geometric Shapes: Created using mathematical rules. Circles, squares, rectangles, triangles, hexagons, pentagons. They feel precise, structured, and man-made. Geometric shapes convey reliability, professionalism, and order. Example: The square shape in a design conveys stability and reliability; the circle conveys wholeness, unity, and infinity."),
bul("Organic (Biomorphic) Shapes: Free-form, irregular shapes that resemble objects found in nature — the outline of a leaf, a cloud, a splash of water, a human figure. They feel natural, warm, approachable, and alive."),
bul("Abstract Shapes: Stylized or simplified representations of natural forms that retain recognition but are not photorealistic — a simple silhouette of a running person, a simplified heart symbol."),
sp(),
body("Psychological Impact of Shapes: Circles suggest community, wholeness, and friendliness — used by many social media platforms (Facebook, Instagram profile pictures are circular). Squares and rectangles suggest stability, trust, and orderliness — used in finance and legal brand identities. Triangles suggest direction, movement, and dynamism — used in technology and innovation-focused brands."),
sp(),
sub("4. Form — Three-Dimensional Solid"),
body("Form is the three-dimensional development of shape. While a shape is flat (2D), a form has volume — length, width, and depth. A square becomes a cube. A circle becomes a sphere. A triangle becomes a cone or pyramid. Forms exist in the real, physical world and can be experienced from multiple viewpoints."),
sp(),
body("Types of Form:"),
bul("Geometric Forms: Mathematically precise 3D shapes — cubes, cylinders, spheres, cones, pyramids. Used extensively in architecture and product design for their structural efficiency and visual clarity."),
bul("Organic Forms: Irregular, natural three-dimensional shapes — the human body, a tree trunk, a rock formation. Used in sculpture, ergonomic product design (handles, seats), and nature-inspired architecture."),
bul("Abstract Forms: 3D sculptures and structures that do not represent recognizable real-world objects — modernist sculpture, abstract architectural elements."),
sp(),
body("Form in Different Design Disciplines: Architecture: The entire discipline deals with creating functional, habitable forms. The form of a building determines its structural integrity, energy efficiency, interior spatial quality, and visual impact on the surrounding environment. Product Design: The form of a product must satisfy both functional requirements (it must be comfortable to hold and use) and aesthetic requirements (it must be visually desirable). Industrial design legends like Jonathan Ive (Apple) and Dieter Rams (Braun) built entire careers around the mastery of functional form. Sculpture: Three-dimensional art forms are created purely for aesthetic and emotional experience. Packaging Design: The form of a container (bottle, box, tube) influences how the product is perceived, how it is used, and how much shelf space it occupies."),
sp(),
body("Creating the Illusion of Form in 2D Design: Designers can suggest three-dimensional form in flat (2D) work through shading (adding darker values to surfaces that receive less light), highlighting (adding lighter values to surfaces facing the light), and cast shadows (placing shadow shapes on surfaces behind the form). These techniques allow flat graphic design to convey depth and three-dimensionality."),
hr(),

// ─── B4 ───
Q("4. Explain the principles of design in simple words.  [CO1 | L2]"), Ans(),
sp(),
sub("Introduction"),
body("While the elements of design (dot, line, shape, form, color, texture, space) are the raw materials that a designer works with, the principles of design are the guidelines that govern how those materials should be arranged and combined to create effective, visually pleasing, and well-organized designs. Think of it this way: if design elements are the notes of music, design principles are the rules of music theory that guide how to arrange those notes into a harmonious melody. The principles help a designer make good decisions about composition, visual hierarchy, and overall organization."),
sp(),
sub("1. Balance"),
body("Balance is the principle of distributing visual weight evenly across a design so that no single part feels too heavy or too dominant compared to the rest. Visual weight is the sense that some elements 'weigh' more than others — larger elements, darker elements, brightly colored elements, and complex elements all feel heavier than smaller, lighter, simpler ones."),
bul("Symmetrical Balance: The design is mirrored on both sides of a central axis. Creates a formal, stable, traditional feeling. Example: The front facade of a classical government building or temple is symmetrically balanced."),
bul("Asymmetrical Balance: Different elements on each side of the composition but still feel balanced because the designer has compensated for differences in size with differences in color, texture, or position. Creates a dynamic, modern, interesting feeling. Example: A poster with a large photograph on the left and three smaller text blocks on the right."),
bul("Radial Balance: Elements arranged in a circular pattern radiating from a central point. Example: A mandala, a clock face, a sunflower."),
sp(),
sub("2. Contrast"),
body("Contrast means placing elements that are significantly different from each other next to each other, so that the difference becomes visually obvious and creates visual interest. Contrast is what makes things stand out and be noticed. Without contrast, a design is monotonous and flat. Contrast can be achieved through: Color contrast (dark vs light, warm vs cool), Size contrast (large vs small), Shape contrast (angular vs curved), Texture contrast (smooth vs rough), Typographic contrast (bold vs light weight)."),
body("Example: Black text on a white background has maximum contrast, making it the most readable combination. A website hero image uses a large, bright-colored headline against a dark background photograph — the contrast makes the headline impossible to miss."),
sp(),
sub("3. Emphasis (Dominance / Focal Point)"),
body("Emphasis is the principle of making one element or area of a design stand out as the most important, drawing the viewer's eye first. Every design needs a focal point — a dominant element that establishes the visual hierarchy and tells the viewer where to look first. Emphasis is created through: Size (making one element larger than all others), Color (using a bright or contrasting color for the key element), Position (placing the key element in the center or at the intersection of thirds), Isolation (surrounding the key element with empty space)."),
body("Example: In a movie poster, the lead actor's face is the focal point — typically the largest element, most centrally placed, most brightly lit, and most detailed. Everything else in the poster is subordinate to that focal point."),
sp(),
sub("4. Repetition (Pattern / Rhythm)"),
body("Repetition involves using the same element (or similar elements) multiple times throughout a design to create visual consistency, rhythm, and unity. Repetition is how branding works — using the same colors, fonts, and logo style repeatedly across all materials builds instant recognition. Pattern is repetition in a regular, predictable arrangement. Rhythm is repetition with variation — like a heartbeat, it repeats but with slight variations that create flow."),
body("Example: A company's annual report uses the same font family, color palette, and graphic elements on every page — the repetition creates a coherent, professional brand identity. A tiled floor uses the repetition of a single tile shape to create pattern."),
sp(),
sub("5. Alignment"),
body("Alignment is the principle of positioning design elements so they are visually connected to each other in an organized, orderly way. Nothing in a well-designed composition is placed arbitrarily — every element is aligned to something else. Alignment creates structure, organization, and cleanliness in a design."),
bul("Left Alignment: Most natural for reading Western languages; creates a clean left edge."),
bul("Center Alignment: Formal, symmetrical; works well for headings and invitations."),
bul("Right Alignment: Less common; creates a deliberate, clean right edge."),
bul("Justified Alignment: Text aligned to both left and right edges; creates formal, newspaper-like columns."),
body("Example: When you look at a well-designed resume, all the job titles are aligned to the same left margin, all the dates are aligned to the same right margin, and all body text is indented by the same amount. This consistency of alignment makes the document easy to scan."),
sp(),
sub("6. Proximity"),
body("Proximity is the principle that elements that are related to each other should be placed close together, while elements that are unrelated should be placed farther apart. Physical closeness in a design implies a conceptual relationship. Proximity helps viewers understand the logical organization of information without needing to read every word."),
body("Example: On a business card, the person's name is placed directly above their job title (close together, indicating they belong together), and the contact details (phone, email, address) are grouped together separately. A viewer instantly understands the information hierarchy without having to decode it consciously."),
sp(),
sub("7. Unity (Harmony)"),
body("Unity is the overall sense that all elements of a design belong together and work as a complete, coherent whole. A design with unity feels finished and purposeful; a design without unity feels chaotic and random. Unity is achieved when the designer consistently applies the other principles — balanced use of color, consistent typographic choices, aligned elements, repetition of graphic motifs — across the entire composition."),
body("Example: A well-designed brand identity system (logo, business cards, letterhead, website) has unity because all elements use the same colors, fonts, visual style, and tone. Despite being different materials, they all feel like they belong to the same family."),
sp(),
sub("8. Proportion (Scale)"),
body("Proportion refers to the relative size and scale of elements in a design in relation to each other and to the whole. Good proportion creates visual harmony. Proportion can be used deliberately to create emphasis (making important elements larger) or to suggest spatial depth (making distant objects smaller in a landscape). The Golden Ratio (approximately 1:1.618) is a mathematically derived proportion found extensively in nature and used by designers for thousands of years to create aesthetically pleasing compositions."),
sp(),
sub("Summary of Design Principles"),
mkTable(
  ["Principle","Simple Definition","Quick Example"],
  [
    ["Balance","Equal visual weight distribution","Symmetrical temple facade"],
    ["Contrast","Emphasize differences for interest","Black text on white paper"],
    ["Emphasis","Create a clear focal point","Big headline on a poster"],
    ["Repetition","Repeat elements for consistency","Same fonts throughout a brand"],
    ["Alignment","Organize elements in a line","Resume with aligned text columns"],
    ["Proximity","Group related items close together","Contact details grouped on business card"],
    ["Unity","Make all elements feel coherent","Consistent brand visual identity"],
    ["Proportion","Size elements relative to importance","Larger heading than body text"],
  ]
),
hr(),

// ─── B5 ───
Q("5. What is design thinking? Explain its meaning and importance.  [CO1 | L1]"), Ans(),
sp(),
sub("What is Design Thinking?"),
body("Design thinking is a structured, human-centered approach to creative problem-solving. It is a methodology that draws from the way designers work — observing people closely, generating many creative ideas without early judgment, building quick prototypes, and testing solutions with real users — and applies these techniques to solve complex, ill-defined problems in business, education, healthcare, government, and social sectors."),
body("The term was popularized by David Kelley and Tim Brown of IDEO, one of the world's most innovative design consultancies, and by the d.school (Hasso Plattner Institute of Design) at Stanford University. Design thinking is not just for professional designers — it is a mindset and methodology that anyone can learn and apply."),
sp(),
sub("The Core Philosophy"),
body("Traditional problem-solving approaches often start with the technology available or the business model and work toward the human. Design thinking reverses this: it starts with the human being — their needs, experiences, frustrations, and aspirations — and works outward from there to find the most appropriate solution."),
...diag([
  "  Traditional Approach:   Technology --> Business Model --> Human Need",
  "                                                                      ",
  "  Design Thinking:        Human Need --> Creative Solution --> Technology",
  "                          (empathy first, solutions second)",
]),
sp(),
sub("The Five Stages of Design Thinking (Stanford d.school Model)"),
...diag([
  "  +----------+   +---------+   +---------+   +-----------+   +--------+",
  "  |  EMPATHIZE|-->| DEFINE  |-->| IDEATE  |-->| PROTOTYPE |-->|  TEST  |",
  "  |           |   |         |   |         |   |           |   |        |",
  "  |Understand |   |Frame    |   |Generate |   |Build quick|   |Learn   |",
  "  |user needs |   |the right|   |many     |   |low-cost   |   |from    |",
  "  |via        |   |problem  |   |ideas    |   |models     |   |users   |",
  "  |observation|   |statement|   |         |   |           |   |        |",
  "+----------+   +---------+   +---------+   +-----------+   +--------+",
  "  <------ Iterative: go back to any earlier stage based on learnings ------>",
]),
sp(),
sub("Stage 1: Empathize"),
body("Empathy is the foundation of design thinking. Before attempting to solve a problem, the designer must develop a deep understanding of the people who will use the solution. This means: observing users in their natural environment without preconceptions, conducting in-depth interviews to understand their motivations and frustrations, immersing yourself in the user's experience (trying to use the current product yourself as a novice user would), and setting aside your own assumptions about what the problem is."),
sp(),
sub("Stage 2: Define"),
body("After gathering rich user insights, the design thinking team synthesizes those observations into a clear, actionable problem statement — often called a 'Point of View' (POV) statement or a 'How Might We' (HMW) question. A good problem statement is user-centered (describes the user and their need, not the solution), broad enough to allow creative solutions, and specific enough to provide focus. Example: Instead of 'Design a better hospital waiting room,' the problem might be redefined as: 'How might we help anxious patients feel informed and in control during long hospital waits?'"),
sp(),
sub("Stage 3: Ideate"),
body("With a clear problem definition, the team generates as many creative ideas as possible. Rules of ideation: Defer judgment — no idea is criticized during ideation; Go for quantity over quality — more ideas means better chance of finding a breakthrough; Encourage wild ideas — the most ridiculous ideas often contain the seed of a brilliant solution; Build on others' ideas (the 'yes, and...' principle from improv theater). Brainstorming, SCAMPER, mind mapping, and 'Crazy 8s' are common ideation techniques."),
sp(),
sub("Stage 4: Prototype"),
body("Selected ideas are quickly translated into physical or digital prototypes — rough, low-cost representations of the proposed solution. The goal is NOT to create a finished product; the goal is to create the minimum version needed to test whether the key assumptions behind the idea are correct. Prototypes can be paper sketches, cardboard models, wireframe mockups, role-playing scenarios, or digital simulations. The less time spent on a prototype before testing it with users, the less wasted if the idea turns out to be wrong."),
sp(),
sub("Stage 5: Test"),
body("Prototypes are tested with real users from the target group. Designers observe and listen carefully: What do users understand intuitively? Where are they confused? What do they value? What frustrates them? Testing is not about validating the solution — it is about learning. Often, testing reveals that the original problem was framed incorrectly, sending the team back to the Define or even Empathize stage. This iteration loop is the most powerful aspect of design thinking."),
sp(),
sub("Importance of Design Thinking"),
bul("Solves the Right Problem: By starting with deep user understanding, design thinking ensures effort is applied to solving the actual user problem, not the assumed problem."),
bul("Encourages Innovation: The ideation stage and the prototype-test loop create a safe environment to try bold ideas. Many groundbreaking innovations — Airbnb, Uber, the Apple iPhone — were developed using design thinking principles."),
bul("Reduces Expensive Failures: By building cheap prototypes and testing early, design thinking surfaces problems when they are cheap to fix — before significant development investment is made."),
bul("Cross-Disciplinary Collaboration: Design thinking brings together people with different expertise (engineers, marketers, users, managers) and gives them a shared creative process. This diversity leads to richer solutions."),
bul("Applicable to Any Domain: Design thinking is not limited to product design. It is used to redesign government services, healthcare systems, educational curricula, financial products, and social programs."),
bul("Builds Empathy as an Organizational Capability: Organizations that practice design thinking systematically develop a deeper understanding of their customers, which leads to products and services that customers love."),
hr(),

// ─── B6 ───
Q("6. Explain the history of design thinking briefly.  [CO1 | L2]"), Ans(),
sp(),
sub("Introduction"),
body("Design thinking as a formal methodology has a relatively recent history, but its intellectual roots stretch back to the birth of modern design and scientific problem-solving. The history of design thinking is the story of how designers, scientists, engineers, and academics gradually discovered that the creative methods designers use intuitively can be made systematic, teachable, and applicable to any domain of human problem-solving."),
sp(),
sub("1950s–1960s: Early Foundations — Design as a Science"),
body("The first serious academic attempt to study and formalize the cognitive process of design came in the 1950s and 1960s with the 'Design Methods Movement.' Scholars like Herbert Simon (Nobel Prize-winning economist and cognitive scientist) argued that design was a form of 'artificial intelligence' — a rational process of searching for solutions in a problem space. His 1969 book 'The Sciences of the Artificial' proposed that design was the core activity of all professional schools (medicine, law, engineering, business) and could be studied scientifically."),
body("During this period, the 'design methods' approach was dominant: researchers tried to systematize design by breaking it into algorithms and decision trees. The goal was to make design rational and reproducible — more like engineering."),
sp(),
sub("1960s–1970s: The Wicked Problems Concept"),
body("In 1969, design theorists Horst Rittel and Melvin Webber introduced the concept of 'wicked problems' — complex social and organizational problems that cannot be solved using linear, algorithmic approaches because they are too interconnected, ambiguous, and value-laden. Wicked problems include: poverty, education system failure, healthcare delivery, urban planning. This concept was critical for design thinking because it showed why traditional analytical problem-solving failed for complex human challenges — and suggested that a different, more creative, iterative approach was needed."),
sp(),
sub("1970s–1980s: Rolf Faste and the d.school Roots at Stanford"),
body("In the 1970s, Rolf Faste, a professor of product design at Stanford University, began formalizing and teaching 'design thinking' as a methodology for creative problem-solving. He influenced a generation of Stanford students, including David Kelley, who would later found IDEO. Faste described design thinking as a mode of creative inquiry that could be taught to non-designers and applied beyond traditional design domains."),
sp(),
sub("1980s–1990s: IDEO and the Design Firm Revolution"),
body("David Kelley founded IDEO (originally David Kelley Design) in 1991, merging with other firms to create the world's most famous innovation and design consultancy. IDEO's approach — deeply collaborative, prototype-heavy, user-centered, and interdisciplinary — became the practical embodiment of design thinking. IDEO's famous redesign of the shopping cart for the television program 'Nightline' in 1999 gave the general public its first clear demonstration of design thinking in action. IDEO's projects for Apple (the first Apple mouse), Palm (the PalmPilot), and Oral-B (toothbrush design) demonstrated that design thinking could produce breakthrough commercial innovations."),
sp(),
sub("2000s: Design Thinking Goes to Business Schools and Mainstream"),
body("In 2004, the Hasso Plattner Institute of Design (the 'd.school') was founded at Stanford University by David Kelley and supported by a major donation from software entrepreneur Hasso Plattner. The d.school became the first institution dedicated to teaching design thinking as a cross-disciplinary methodology to students from all departments — engineering, medicine, law, business, and social sciences. Tim Brown, CEO of IDEO, published his influential Harvard Business Review article 'Design Thinking' in 2008 (later expanded into a book), bringing the concept to the attention of the global business community. Around the same time, Roger Martin at the Rotman School of Management argued in 'The Design of Business' (2009) that the design thinking mindset was the key competitive advantage for innovation."),
sp(),
sub("2010s–Present: Worldwide Adoption"),
body("Design thinking has been adopted by corporations (Google, IBM, Procter and Gamble, Samsung, GE), government agencies (the US government's innovation lab 18F, Singapore's government design team), international development organizations (IDEO.org, Gates Foundation), schools and universities worldwide, and healthcare systems seeking patient-centered care improvements. Today, design thinking is taught in business schools, medical schools, K-12 education, and corporate training programs globally. Its scope has expanded far beyond product design to address complex social challenges, organizational transformation, and public policy innovation."),
sp(),
sub("Key Milestones Summary"),
mkTable(
  ["Period","Key Development","Key Figure(s)"],
  [
    ["1950s–60s","Design methods movement; design as rational science","Herbert Simon"],
    ["1969","'Wicked problems' concept formalized","Rittel and Webber"],
    ["1970s","Design thinking taught at Stanford","Rolf Faste"],
    ["1991","IDEO founded; design thinking applied commercially","David Kelley"],
    ["1999","IDEO shopping cart redesign demonstrated on TV","IDEO team"],
    ["2004","d.school founded at Stanford","David Kelley, Hasso Plattner"],
    ["2008","'Design Thinking' article brings concept mainstream","Tim Brown (IDEO)"],
    ["2009","Design thinking in business education","Roger Martin"],
    ["2010s+","Global adoption across all sectors","Multiple institutions worldwide"],
  ]
),
hr(),

// ─── B7 ───
Q("7. Discuss the role of design thinking in problem-solving.  [CO1 | L3]"), Ans(),
sp(),
sub("Introduction"),
body("Traditional problem-solving approaches — particularly in engineering, business, and management — rely on analytical, convergent thinking: gather data, analyze it logically, identify the single best solution, and implement it. This works well for problems that are well-defined, stable, and have clear right answers (technical problems, mathematical problems, logistics optimization). However, many of the most important challenges facing organizations and society are not like this. They are complex, ambiguous, involve conflicting human needs, and have no single right answer. For these 'wicked problems,' design thinking offers a fundamentally different and more effective problem-solving approach."),
sp(),
sub("Why Traditional Problem-Solving Falls Short"),
body("Traditional approaches often fail for complex human-centered problems because: They assume the problem is correctly understood before solution-finding begins (often untrue). They value data and analysis over human observation and empathy. They discourage early experimentation and accept only well-validated ideas for implementation. They tend toward convergence too early — eliminating options before the full solution space has been explored. They treat users as passive recipients of solutions rather than active participants in solution development."),
sp(),
sub("How Design Thinking Transforms Problem-Solving"),
sp(),
sub("1. Reframing the Problem"),
body("One of the most powerful contributions of design thinking to problem-solving is its insistence on questioning whether the stated problem is actually the real problem. The design thinking principle of 'going deep before going broad' means spending significant time understanding the situation from multiple perspectives before defining the problem. Often, this investigation reveals that the stated problem is a symptom, and the real problem is quite different."),
body("Example: A hospital was concerned about long patient wait times in the emergency room and asked for help solving 'the wait time problem.' A design thinking investigation revealed that the patients' primary frustration was not the length of the wait per se — it was the anxiety of not knowing how long they would wait and why. The real problem was information and communication, not queue management. The solution — a simple digital display showing estimated wait times and status updates — cost a fraction of operational changes and dramatically improved patient satisfaction."),
sp(),
sub("2. Human-Centered Solution Design"),
body("Design thinking ensures that solutions are designed around the actual needs, behaviors, and limitations of the people who will use them, rather than around the technical capabilities available or the preferences of the organization providing the solution. This human-centering dramatically increases the probability that the solution will actually be adopted and valued by users."),
body("Example: The Gates Foundation invested millions in developing technically excellent composting toilets for communities in Africa without running water. Despite being technically superior, adoption rates were very low. A design thinking investigation revealed that the toilets violated strong cultural norms around privacy and communal use of sanitation facilities. The solution had to be redesigned around the cultural context of the users, not just the technical sanitation challenge."),
sp(),
sub("3. Divergent Thinking Before Convergent Thinking"),
body("Conventional problem-solving jumps to evaluation and selection of ideas too quickly, closing down the solution space before it has been fully explored. Design thinking deliberately separates the generative phase (ideation — creating many possible solutions without judgment) from the evaluative phase (selection — choosing the most promising ones to prototype). This diverge-then-converge rhythm consistently produces more innovative solutions than approaches that evaluate every idea as soon as it is proposed."),
...diag([
  "  Problem-Solving Mindsets:",
  "  Traditional:  Problem --> (narrow analysis) --> Single Solution",
  "                                                                  ",
  "  Design         Problem --> DIVERGE (many ideas) --> CONVERGE --> ",
  "  Thinking:              (explore broadly)         (select best)   ",
  "                Prototype --> Test --> Learn --> Iterate           ",
]),
sp(),
sub("4. Learning Through Rapid Prototyping and Testing"),
body("Design thinking's bias toward 'building to think' — creating quick, cheap prototypes before committing to a full solution — fundamentally changes the risk profile of innovation. Rather than spending 18 months building a product and then discovering users don't want it, design thinking encourages building a rough prototype in 2 days and testing it with users the same week. Failures discovered early with cheap prototypes are learning opportunities; failures discovered after full implementation are catastrophes."),
body("Example: IDEO designed a new insulin pen for a pharmaceutical company using design thinking. Rather than spending a year building a functional prototype, the team spent an afternoon building mockups from foam, tape, and plumbing supplies — and used these rough models to test grip comfort, needle cap design, and dosing dial ergonomics with diabetic patients. The insights from these cheap tests informed the design before a single penny was spent on engineering."),
sp(),
sub("5. Embracing Ambiguity and Iteration"),
body("Complex problems are inherently messy, contradictory, and evolving. Design thinking trains problem-solvers to be comfortable with ambiguity — to start acting and learning even before having complete information. The iterative cycle of Prototype → Test → Learn → Refine allows the team to progressively narrow in on an effective solution through accumulated learning, rather than requiring a complete upfront analysis."),
sp(),
sub("6. Building Collaborative Empathy Across Disciplines"),
body("Design thinking is most powerful when practiced by diverse, cross-functional teams. When engineers, marketers, social workers, end users, and managers work together through the design thinking process, they develop shared empathy for the user and shared ownership of the solution. This cross-disciplinary collaboration consistently produces more innovative and implementable solutions than siloed expert teams working separately."),
sp(),
sub("Real-World Impact of Design Thinking in Problem-Solving"),
mkTable(
  ["Domain","Problem","Design Thinking Solution"],
  [
    ["Healthcare","Low handwashing compliance in hospitals","Redesigned soap dispensers and visual cues; IDEO project"],
    ["Education","Students disengaged from STEM learning","Hands-on project-based learning curricula",""],
    ["Banking","Complex, intimidating banking forms for low-literacy customers","Picture-based, simplified forms; conversational tone"],
    ["Government","Citizens not filing taxes due to complex forms","Plain-language, shorter forms; online step-by-step guides"],
    ["Social","Undernutrition in infants in rural Vietnam","Local food-based solutions discovered through village empathy visits"],
  ]
),
hr(),

// ─── B8 ───
Q("8. Explain how design elements and principles work together in a design.  [CO1 | L2]"), Ans(),
sp(),
sub("Introduction"),
body("Design elements (dot, line, shape, form, color, texture, space) and design principles (balance, contrast, emphasis, repetition, alignment, proximity, unity, proportion) are not independent concepts. In any real design, they work together simultaneously and interdependently. The elements are the visual raw materials, and the principles are the rules for combining those materials effectively. A skilled designer uses both in concert — choosing elements carefully and arranging them according to principles to create compositions that communicate clearly, attract and hold attention, and produce the desired emotional response."),
sp(),
sub("The Relationship: Elements and Principles"),
...diag([
  "  DESIGN ELEMENTS              DESIGN PRINCIPLES",
  "  (What you use)               (How you use them)",
  "  +-----------------+          +-------------------+",
  "  | Dot             |          | Balance           |",
  "  | Line            |  +----+  | Contrast          |",
  "  | Shape           |  |    |  | Emphasis          |",
  "  | Form            |->|    |->| Repetition        |",
  "  | Color           |  |    |  | Alignment         |",
  "  | Texture         |  +----+  | Proximity         |",
  "  | Space           |  Combine | Unity             |",
  "  +-----------------+          | Proportion        |",
  "                               +-------------------+",
  "                                        |",
  "                                        v",
  "                               EFFECTIVE DESIGN",
  "                         (Communicates, attracts, functions)",
]),
sp(),
sub("How They Work Together — Step by Step Examples"),
sp(),
sub("Example 1: Designing a Warning Sign"),
body("Problem: Design a sign that warns drivers of a sharp curve ahead."),
body("Element choice: Shape — Triangle is chosen (geometric shape that naturally draws attention and suggests direction). Color — Red and yellow are chosen (warm colors that signal danger and urgency). Line — A curved arrow line inside the triangle shows the direction of the curve. Contrast — White line on dark red triangle provides maximum visibility."),
body("Principle application: Emphasis — The triangle is the dominant shape, making the sign impossible to miss. Contrast — The high color contrast ensures the sign is readable in poor light or bad weather. Proportion — The triangle is sized to be visible from 100 meters at driving speed. Simplicity (Unity) — Only the essential information is included; nothing distracts from the warning message."),
body("Result: The combination of angular shape (element), red-yellow color (element), curved arrow line (element), arranged with emphasis and contrast (principles) creates an instantly understandable warning sign."),
sp(),
sub("Example 2: Designing a Book Cover"),
body("Problem: Design a book cover for a romance novel."),
body("Element choice: Color — Warm reds and pinks to suggest love and passion. Shape — Organic, flowing shapes rather than sharp geometric forms to suggest softness and emotion. Typography (line) — Cursive, flowing font for the title to reinforce the romantic theme. Texture — A subtle soft texture in the background to suggest warmth."),
body("Principle application: Balance — The title is centered (symmetrical balance), creating a formal, classic romantic feeling. Emphasis — The author's name (smaller) is clearly subordinate to the title (larger, more prominent), establishing clear visual hierarchy. Unity — All elements (color palette, typography style, image style) share the same romantic, warm emotional tone, creating a coherent composition."),
sp(),
sub("Example 3: Designing a Brand Logo"),
body("Problem: Design a logo for a technology startup."),
body("Element choice: Shape — Clean geometric shapes (circle or hexagon) to suggest precision and innovation. Color — Blue (trust, stability, technology) with a bright accent color (energy, dynamism). Space — Generous white space around the mark to suggest modernity and confidence."),
body("Principle application: Simplicity/Unity — The logo uses minimal elements; nothing is present that doesn't contribute to the message. Contrast — The accent color element stands out sharply against the primary blue. Proportion — The mark and the word mark are sized in harmonious proportion (Golden Ratio used for the relationship between the icon and the typeset company name). Balance — Asymmetrical balance used to make the logo feel dynamic and forward-looking rather than static."),
sp(),
sub("Practical Guidelines for Combining Elements and Principles"),
mkTable(
  ["Goal","Elements to Use","Principles to Apply"],
  [
    ["Create visual interest","Contrasting colors, varied shapes","Contrast, emphasis"],
    ["Organize information","Lines as dividers, white space","Alignment, proximity"],
    ["Build brand recognition","Specific colors, fonts, shapes","Repetition, unity"],
    ["Guide viewer's eye","Size variations, directional lines","Emphasis, proportion"],
    ["Create sense of movement","Diagonal lines, organic shapes","Rhythm, contrast"],
    ["Convey calm and stability","Horizontal lines, muted colors","Balance, unity"],
    ["Suggest luxury and quality","Generous white space, refined typography","Proportion, emphasis"],
  ]
),
sp(),
sub("The Analogy with Music"),
body("The relationship between design elements and principles is similar to the relationship between musical notes (elements) and music theory (principles). Any piece of music uses the same basic notes (C, D, E, F, G, A, B — the elements). What distinguishes a beautiful symphony from random noise is how those notes are arranged — following principles of melody, harmony, rhythm, tempo, and dynamics. Similarly, a master designer takes the same basic visual elements available to everyone and arranges them according to design principles to create something that communicates powerfully and beautifully."),
hr(),

// ─── B9 ───
Q("9. What are new materials used in industry? Explain any three with examples.  [CO1 | L1]"), Ans(),
sp(),
sub("Introduction"),
body("New materials (also called advanced materials or engineered materials) are substances that have been deliberately designed, engineered, or synthesized to have properties significantly superior to those of conventional materials. Unlike traditional materials (wood, iron, copper, glass) that were discovered and adopted as found in nature, new materials are created through scientific research and engineering to meet specific performance requirements that existing materials cannot satisfy. The development of new materials is one of the key drivers of industrial and technological innovation."),
sp(),
sub("Why New Materials Matter"),
bul("Enable products that were previously physically impossible to create."),
bul("Reduce weight while maintaining or increasing strength (critical for aerospace and transportation)."),
bul("Improve energy efficiency (lighter vehicles, better insulation, more efficient batteries)."),
bul("Enable extreme performance in harsh environments (high temperature, chemical exposure, radiation)."),
bul("Create new functionalities (self-healing, shape-memory, electrical conductance in flexible materials)."),
sp(),
sub("1. Carbon Fiber Reinforced Polymer (CFRP) — Carbon Fiber Composites"),
sp(),
sub("What it is:"),
body("Carbon fiber reinforced polymer (commonly called 'carbon fiber') is a composite material made of very thin, stiff filaments of carbon atoms bonded together in a crystalline structure, embedded in a resin (polymer) matrix. The carbon fibers provide extraordinary tensile strength and stiffness, while the resin matrix holds them together and transfers load between fibers."),
sp(),
sub("Key Properties:"),
bul("Extremely high strength-to-weight ratio: stronger than steel but 75% lighter."),
bul("Very high stiffness (resistance to bending and deformation)."),
bul("Excellent fatigue resistance — maintains strength through millions of load cycles."),
bul("Low thermal expansion — does not significantly expand or contract with temperature changes."),
bul("Corrosion resistant — does not rust or corrode."),
sp(),
sub("Applications and Examples:"),
bul("Aerospace: Boeing 787 Dreamliner fuselage and wings are made of 50% carbon fiber composites by weight — saving enormous fuel by being dramatically lighter than aluminum. Airbus A350 also uses extensive CFRP."),
bul("Automotive: Formula 1 racing car bodies, chassis, and wings are made entirely of carbon fiber — combining crash protection with extreme light weight. Road cars like the BMW i3, McLaren supercars, and high-performance sports cars use CFRP body panels."),
bul("Sports equipment: Tennis rackets, bicycle frames, golf clubs, cricket bat handles, rowing oars, and ski poles all use carbon fiber for lightweight, high-performance performance."),
bul("Renewable energy: Wind turbine blades up to 100 meters long are made of carbon fiber composites — enabling the large-scale offshore wind turbines that generate electricity economically."),
bul("Medical: Prosthetic limbs for amputee athletes (the 'blade runner' prosthetics seen in Paralympic sprinting) use carbon fiber for their extraordinary combination of lightness and spring."),
sp(),
sub("Limitations:"),
body("Carbon fiber is expensive to manufacture (high energy input required for the carbonization process). It is difficult to recycle. If it cracks or fractures, the failure mode can be sudden and catastrophic (unlike metal, which deforms before breaking). Joining carbon fiber parts requires specialized adhesive bonding rather than simple welding."),
sp(),
sub("2. Graphene"),
sp(),
sub("What it is:"),
body("Graphene is a single, one-atom-thick layer of carbon atoms arranged in a regular hexagonal (honeycomb) lattice. It is essentially a single layer of the graphite found in pencils, but isolated and used as a material in its own right. Graphene was first isolated by Andre Geim and Konstantin Novoselov at the University of Manchester in 2004, for which they received the Nobel Prize in Physics in 2010. Despite being the thinnest possible material, graphene has extraordinary properties across multiple dimensions."),
sp(),
sub("Key Properties:"),
bul("Strongest material ever tested: 200 times stronger than steel by weight."),
bul("Extremely light: one square meter weighs approximately 0.77 milligrams."),
bul("Excellent electrical conductor: electrons move through graphene with almost no resistance at room temperature."),
bul("Excellent thermal conductor: conducts heat more efficiently than copper."),
bul("Nearly transparent: absorbs only 2.3% of light passing through it."),
bul("Flexible and stretchable: can be stretched up to 20% without breaking."),
bul("Essentially impermeable: even the smallest gas molecules (helium) cannot pass through an intact graphene sheet."),
sp(),
sub("Applications and Examples:"),
bul("Electronics: Next-generation transistors thinner and faster than silicon transistors. Flexible touchscreens and displays for smartphones and wearables. Graphene-based sensors for detecting single molecules of gas or chemicals."),
bul("Energy storage: Graphene-enhanced supercapacitors and batteries charge faster and store more energy than conventional lithium-ion batteries. This could transform electric vehicles (minutes instead of hours to charge)."),
bul("Composites: Adding a tiny amount of graphene to other materials dramatically improves their strength, electrical conductivity, and durability. Graphene-enhanced concrete is stronger; graphene-enhanced polymers are tougher."),
bul("Medical: Graphene-based biosensors can detect cancer biomarkers from a blood sample at extremely low concentrations — enabling early cancer detection. Graphene is being explored for drug delivery applications."),
bul("Water purification: The impermeability of graphene except to water molecules makes it ideal for high-efficiency desalination membranes."),
sp(),
sub("Limitations:"),
body("Large-scale, defect-free production of graphene at affordable cost remains challenging. The technology is largely still in research and early commercial stages for most applications, though graphene-enhanced sports equipment (tennis rackets, bicycle wheels) is already commercially available."),
sp(),
sub("3. Smart Materials — Shape Memory Alloys (SMA)"),
sp(),
sub("What they are:"),
body("Smart materials are materials that respond to changes in their environment (temperature, pressure, light, electric field, magnetic field) by changing their own properties or shape in a controlled and reversible way. Shape Memory Alloys (SMA) are a class of smart metals that, when deformed at one temperature, will return to their original pre-programmed shape when heated above a critical transformation temperature. Nitinol (Nickel-Titanium, developed by the US Naval Ordnance Laboratory) is the most widely used SMA."),
sp(),
sub("Key Properties of Nitinol:"),
bul("Shape Memory Effect: Deformed at room temperature, the alloy returns to its original shape when heated above 40-50°C."),
bul("Superelasticity: At body temperature, Nitinol can be deformed significantly (up to 8% strain) and will spring back to its original shape when the deforming force is removed — unlike conventional metals that would permanently deform."),
bul("Biocompatibility: Safe for use inside the human body."),
bul("High fatigue resistance: Can undergo millions of shape-change cycles without failure."),
sp(),
sub("Applications and Examples:"),
bul("Medical devices: Stents (tiny mesh tubes that prop open blocked blood vessels after angioplasty). A Nitinol stent is compressed into a catheter for delivery, inserted into the blocked artery, and then self-expands to its pre-programmed diameter at body temperature. Also used for bone anchors, orthodontic arch wires, and surgical instruments that self-deploy in laparoscopic surgery."),
bul("Aerospace: Morphing aircraft wing structures that change shape to optimize aerodynamic performance at different flight speeds. Self-deploying antennas and structural elements on satellites that unfold in space."),
bul("Consumer products: 'Memory' frames in eyeglasses — Nitinol frames can be severely bent and will spring back to their original shape, making them virtually unbreakable."),
bul("Robotics: Artificial muscles in robots that contract when heated (imitating biological muscle action) without the complexity of hydraulics or electric motors."),
bul("Civil engineering: Self-sealing rivets and fasteners for aircraft assembly. Seismic actuators in earthquake-resistant building connections."),
sp(),
sub("Other Notable New Materials (Brief Mention)"),
mkTable(
  ["Material","Key Property","Application"],
  [
    ["Aerogel","Lightest solid, excellent thermal insulation","NASA spacesuits, building insulation"],
    ["Metamaterials","Engineered periodic structures; negative refractive index","Invisibility cloaks (research), perfect lenses"],
    ["Self-healing polymers","Repair microscopic cracks automatically","Automotive paint, spacecraft coatings"],
    ["Piezoelectric materials","Generate electricity from mechanical stress","Energy harvesting floors, sensors, actuators"],
    ["Liquid Crystal Polymers","Change optical properties with electric field","LCD screens, smart windows"],
  ]
),
hr(),

// ─── B10 ───
Q("10. Explain the application of design thinking in industry with a simple example.  [CO1 | L2]"), Ans(),
sp(),
sub("Introduction"),
body("Design thinking has moved from academic theory and design consultancies into the mainstream of industrial practice. Companies across every sector — consumer electronics, healthcare, financial services, automotive, retail, and manufacturing — have adopted design thinking as a systematic methodology for innovating products, services, processes, and customer experiences. Its power lies in its ability to generate solutions that are desirable to users (they genuinely want it), technically feasible (it can be built), and economically viable (the business can sustain it). When all three dimensions align, breakthrough innovation occurs."),
sp(),
...diag([
  "  The Three Dimensions of Design Thinking Innovation:",
  "                                                      ",
  "              DESIRABILITY",
  "            (Human-centered)",
  "                   *",
  "                  / \\",
  "                 /   \\",
  "    INNOVATION  /  +  \\",
  "    (sweet spot)*     * VIABILITY",
  "               \\     / (Business-centered)",
  "                \\   /",
  "                 \\ /",
  "                  *",
  "             FEASIBILITY",
  "          (Technology-centered)",
  "                                                      ",
  "  Design Thinking ensures all three circles overlap.",
]),
sp(),
sub("Design Thinking in Industry — Framework"),
body("When an industrial organization applies design thinking to a challenge, they follow the five-stage process (Empathize, Define, Ideate, Prototype, Test) but adapt it to their specific industry context, timelines, and resources. Cross-functional teams are formed to bring multiple perspectives. Customer immersion replaces assumptions about what customers want. Rapid experimentation replaces long development cycles."),
sp(),
sub("Simple Illustrative Example: Redesigning a Hospital Discharge Process"),
body("Context: A large hospital was struggling with patient complaints about the discharge process. Patients were waiting 4-6 hours after doctors cleared them to go home. This caused frustration for patients, blocked beds needed for incoming patients, and reduced patient satisfaction scores. The hospital's administration framed the problem as: 'We need to speed up our discharge paperwork processing.'"),
sp(),
sub("Stage 1: Empathize — Understanding the Real Experience"),
body("A design thinking team was formed consisting of a nurse, a pharmacist, a hospital administrator, a patient experience specialist, and two former patients as advisors. Instead of immediately proposing solutions, the team spent two weeks observing and interviewing:"),
bul("They shadowed nurses and doctors during discharge rounds, timing each step."),
bul("They sat with patients in their rooms during the discharge waiting period, listening to their experience."),
bul("They interviewed pharmacists about what caused prescription delays."),
bul("They mapped the physical journey of discharge paperwork through the hospital."),
body("Key observations: Patients spent most of their waiting time not knowing what stage of the process they were in or how much longer they would wait. Pharmacists received prescriptions in batches at the end of morning rounds rather than as each patient was discharged, creating a bottleneck. Many patients had their discharge clothes brought by family who arrived before discharge was processed — they were ready to leave but couldn't."),
sp(),
sub("Stage 2: Define — Reframing the Problem"),
body("Based on empathy research, the team realized that the 'paperwork processing speed' problem framing was incorrect. The real problems were: (1) patients felt out of control and anxious because they received no information during the wait, and (2) a structural bottleneck where prescriptions were batched rather than processed individually. The new problem statement: 'How might we help patients feel informed and in control during discharge, while eliminating the prescription batching bottleneck that causes the longest delays?'"),
sp(),
sub("Stage 3: Ideate — Generating Many Solutions"),
body("The team conducted a 90-minute ideation session. Over 60 ideas were generated without judgment:"),
bul("A 'discharge countdown clock' displayed in patient rooms."),
bul("A text message notification system sending status updates to patients' phones."),
bul("A dedicated discharge lounge where ready-to-leave patients wait comfortably rather than in hospital beds."),
bul("A discharge coordinator role — a single person responsible for each patient's departure."),
bul("Electronic prescriptions sent directly to the patient's pharmacy of choice before they even leave the doctor's office."),
bul("A 'discharge pack' prepared the evening before planned discharges, containing pre-printed instructions, medications for common cases, and completed paperwork."),
body("After voting, the top 3 ideas selected for prototyping: text updates, a discharge lounge, and the pre-prepared discharge pack."),
sp(),
sub("Stage 4: Prototype — Building Quick Test Versions"),
body("Prototype 1 (Text updates): A nurse manually sent text messages from their personal phone to consenting patients every 30 minutes with discharge status updates. No technology investment — just a human process test. Prototype 2 (Discharge lounge): A quiet corner of the waiting room was designated as a 'departure lounge' with comfortable chairs, charging stations, and a TV — created in one afternoon with furniture moved from storage. Prototype 3 (Discharge pack): Nurses in one ward prepared a checklist-based pack for all scheduled next-day discharges the evening before."),
sp(),
sub("Stage 5: Test — Learning from Real Users"),
body("All three prototypes were tested for two weeks in one hospital ward. Results: The text message updates received overwhelmingly positive patient feedback — patients reported feeling much less anxious even when the wait was the same length. The discharge lounge reduced bed blockage by 47% in the test ward (patients moved out of beds to the lounge, freeing beds faster). The discharge pack reduced prescription processing time from 45 minutes to 12 minutes on average."),
body("Insight from testing: The text message update prototype revealed that some patients were reluctant to leave their rooms to go to the discharge lounge because they feared missing a doctor or a key message. This led to a design refinement: the text messages would specifically invite patients to the discharge lounge when ready."),
sp(),
sub("Outcome and Scale-Up"),
body("Based on test results, the hospital implemented all three solutions at scale: an automated text message system connected to the hospital's electronic records, a properly designed discharge lounge on each ward, and the discharge preparation checklist process. Results after 3 months: Average discharge wait time reduced from 4.5 hours to 1.8 hours. Patient satisfaction scores for discharge experience improved by 34%. Bed availability during peak admission periods increased by 22%."),
sp(),
sub("Other Industry Examples of Design Thinking Application"),
mkTable(
  ["Industry","Challenge","Design Thinking Outcome"],
  [
    ["Banking (ICICI Bank)","Complex loan application process","Simplified 1-page application; in-branch guides"],
    ["Automobile (Ford)","Designing cars for elderly drivers","Aging simulation suit worn by designers; improved visibility, easier entry/exit"],
    ["Technology (IBM)","Internal software tools difficult to use","Design thinking workshops; UX overhaul; 301% ROI reported"],
    ["Education","Students failing introductory college courses","Co-design sessions with students revealed study space and tutoring needs"],
    ["Agriculture","Farmers not adopting new equipment","Field empathy revealed literacy barriers; redesigned with pictorial instructions"],
  ]
),
sp(),
sub("Conclusion"),
body("Design thinking in industry is not a theoretical exercise — it produces measurable improvements in products, services, and processes that matter to real people. Its power comes from its insistence on deeply understanding the human experience before proposing solutions, its encouragement of bold experimentation through prototyping, and its iterative learning loop that continuously refines solutions based on real-world feedback. Organizations that adopt design thinking as a core capability develop a fundamental competitive advantage: the ability to consistently create solutions that people genuinely love."),
hr(),

    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("DT_Unit1_QnA.docx", buf);
  console.log("Done");
});
# Contributing to Baseldytsch

Thank you for your interest in contributing to the Baseldytsch language learning app! 🇨🇭

We welcome contributions from everyone who wants to help improve this resource for Basel German learners.

## Ways to Contribute

### 1. Report Issues
- Found a bug? [Open an issue](https://github.com/a-tondo/Baseldytsch/issues)
- Have a suggestion? [Start a discussion](https://github.com/a-tondo/Baseldytsch/discussions)

### 2. Improve Content
- **Language Corrections**: Fix spelling, grammar, or translation errors
- **Add Vocabulary**: Suggest new words and phrases
- **Cultural Insights**: Add or improve cultural information
- **New Lessons**: Propose additional lesson topics

### 3. Enhance Features
- **UI Improvements**: Better design or user experience
- **New Features**: Speech recognition, flashcards, etc.
- **Bug Fixes**: Fix existing issues
- **Performance**: Optimize loading or rendering

### 4. Documentation
- Improve README or guides
- Add translations of documentation
- Create tutorials or videos

## How to Contribute

### For Non-Technical Contributors

1. **Report Issues**: Use the [Issues page](https://github.com/a-tondo/Baseldytsch/issues) to report bugs or suggest improvements
2. **Suggest Content**: Open an issue with "Content Suggestion" in the title
3. **Share Ideas**: Start a discussion in the Discussions tab

### For Developers

#### Setup
```bash
# Clone the repository
git clone https://github.com/a-tondo/Baseldytsch.git

# Navigate to the directory
cd Baseldytsch

# Open index.html in your browser
open index.html
```

#### Making Changes

1. **Fork the Repository**
   - Click "Fork" at the top of the repo
   - Clone your fork locally

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Edit the relevant files
   - Test your changes thoroughly
   - Follow the existing code style

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Describe your changes clearly

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain consistent indentation (4 spaces)
- Add comments for major sections

### CSS
- Follow the existing naming conventions
- Use CSS variables for colors and common values
- Keep styles organized by component

### JavaScript
- Use ES6+ features
- Add comments for complex logic
- Keep functions focused and readable
- Follow existing naming conventions

## Content Guidelines

### Language Content
- **Accuracy**: Ensure all Baseldytsch is correct
- **High German**: Always include High German comparisons
- **English**: Provide clear English translations
- **Cultural Context**: Add notes about usage and culture

### Cultural Information
- **Respectful**: Be respectful of Swiss culture
- **Accurate**: Verify cultural information
- **Practical**: Focus on useful, actionable advice
- **Sourced**: Cite sources when possible

## Adding New Lessons

If you want to add a new lesson:

1. Add lesson data to `data.js` in the `lessonData` object
2. Follow the existing structure:
   ```javascript
   7: {
       title: "Your Lesson Title",
       description: "Brief description",
       phrases: [
           {
               baseldytsch: "Basel phrase",
               german: "High German",
               english: "English translation",
               note: "Usage notes"
           }
       ]
   }
   ```

## Adding Vocabulary

To add vocabulary items:

1. Edit `data.js`
2. Add to the appropriate category in `vocabularyData`
3. Include: word, translation, and High German equivalent

## Testing Your Changes

Before submitting:
- ✅ Test in multiple browsers (Chrome, Firefox, Safari)
- ✅ Test responsive design (mobile, tablet, desktop)
- ✅ Check all audio/speech features work
- ✅ Verify no console errors
- ✅ Test navigation and user flows
- ✅ Proofread all text content

## Pull Request Process

1. **Clear Description**: Explain what changes you made and why
2. **Reference Issues**: Link to related issues if applicable
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested your changes
5. **Documentation**: Update README or docs if needed

## Questions?

- **General Questions**: Open a [Discussion](https://github.com/a-tondo/Baseldytsch/discussions)
- **Bug Reports**: Open an [Issue](https://github.com/a-tondo/Baseldytsch/issues)
- **Feature Requests**: Open an Issue with "Feature Request" label

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks
- Publishing others' private information
- Other conduct inappropriate in a professional setting

## Attribution

Contributors will be acknowledged in the project. Your GitHub profile will be linked in the commit history.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for helping make Baseldytsch better for everyone!** 🇨🇭

Questions? Feel free to reach out by opening an issue or discussion.


'use strict';

const path = require('path');
const fsp = require('./fsp');
const loadThemes = require('./loadThemes');

const THEME_DIR = path.join(__dirname, '..', 'build');
const THEME_YAML_FILE = path.join(__dirname, '..', 'themes', 'glyph.yml');

function toJSON(theme) {
    return JSON.stringify(theme, null, 4);
}

async function build() {
    if (!(await fsp.exists(THEME_DIR))) {
        await fsp.mkdir(THEME_DIR);
    }

    const { standardTheme } = await loadThemes(THEME_YAML_FILE);
    const standardThemePath = path.join(THEME_DIR, 'glyph.json');

    await Promise.all([
        fsp.writeFile(standardThemePath, toJSON(standardTheme))
    ]);
}

module.exports = {
    build,
};

build();
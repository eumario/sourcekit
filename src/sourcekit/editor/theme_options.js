define('sourcekit/editor/theme_options', [
        'ace/theme/clouds',
        'ace/theme/clouds_midnight',
        'ace/theme/cobalt',
        'ace/theme/dawn',
        'ace/theme/eclipse',
        'ace/theme/idle_fingers',
        'ace/theme/kr_theme',
        'ace/theme/mono_industrial',
        'ace/theme/monokai',
        'ace/theme/pastel_on_dark',
        'ace/theme/textmate',
        'ace/theme/twilight',
        'sourcekit/editor/theme/merbivore',
        'sourcekit/editor/theme/merbivore_soft',
        'sourcekit/editor/theme/vibrant_ink',
    ], function() {

return {
    
    options: [
        { label: 'Clouds', value: 'clouds', module: 'ace/theme/clouds' },
        { label: 'Clouds Midnight', value: 'clouds_midnight', module: 'ace/theme/clouds_midnight' },
        { label: 'Cobalt', value: 'cobalt', module: 'ace/theme/cobalt' },
        { label: 'Dawn', value: 'dawn', module: 'ace/theme/dawn' },
        { label: 'Eclipse', value: 'eclipse', module: 'ace/theme/eclipse' },
        { label: 'Idle Fingers', value: 'idle_fingers', module: 'ace/theme/idle_fingers' },
        { label: 'KR Theme', value: 'kr_theme', module: 'ace/theme/kr_theme' },
		{ label: 'Merbivore', value: 'merbivore', module: 'sourcekit/editor/theme/merbivore' },
		{ label: 'Merbivore Soft', value: 'merbivore_soft', module: 'sourcekit/editor/theme/merbivore_soft' },
        { label: 'Mono Industrial', value: 'mono_industrial', module: 'ace/theme/mono_industrial' },
        { label: 'Monokai', value: 'monokai', module: 'ace/theme/monokai' },
        { label: 'Pastel on Dark', value: 'pastel_on_dark', module: 'ace/theme/pastel_on_dark' },
        { label: 'Textmate', value: 'textmate', module: 'ace/theme/textmate' },
        { label: 'Twilight', value: 'twilight', module: 'ace/theme/twilight'},
        { label: 'Vibrant Ink', value: 'vibrant_ink', module: 'sourcekit/editor/theme/vibrant_ink'}
    ],
    
    findOptions: function(selectedTheme) {
        for (var key in this.options) {
            if (selectedTheme == this.options[key].value) {
                this.options[key].selected = true;
            } else {
                this.options[key].selected = false;
            }
        }
        return this.options;
    },
    
    getThemeByName: function(themeName) {
        // Dummy O(n) search for now since the # of themes is low
        var moduleName = null;
        for (var key in this.options) {
            if (themeName == this.options[key].value) {
                moduleName = this.options[key].module;
                break;
            }
        }
        
        if (moduleName) {
            return require(moduleName);
        } 
        
        return null;
    }
    
}});

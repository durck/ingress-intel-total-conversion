// ==UserScript==
// @id             iitc-plugin-highlight-portals-my-level@vita10gy
// @name           IITC plugin: Highlight portals by my level
// @category       Highlighter
// @version        0.1.2.@@DATETIMEVERSION@@
// @description    [@@BUILDNAME@@-@@BUILDDATE@@] Use the portal fill color to denote if the portal is either at and above, or at and below your level.
@@METAINFO@@
// ==/UserScript==

@@PLUGINSTART@@

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.portalHighlighterPortalsMyLevel = function() {};


window.plugin.portalHighlighterPortalsMyLevel.belowLevel = function(data) {
  window.plugin.portalHighlighterPortalsMyLevel.colorLevel(true,data);
}

window.plugin.portalHighlighterPortalsMyLevel.aboveLevel = function(data) {
  window.plugin.portalHighlighterPortalsMyLevel.colorLevel(false,data);
}

window.plugin.portalHighlighterPortalsMyLevel.colorLevel = function(below,data) {
  var portal_level = data.portal.options.level;

  // as portal levels can never be higher than L8, clamp the player level to this for highlight purposes
  var player_level = Math.min(PLAYER.level,8);

  var opacity = .6;
  if((below && portal_level <= player_level) ||
     (!below && portal_level >= player_level)) {
    data.portal.setStyle({fillColor: 'red', fillOpacity: opacity});
  } 
}

var setup =  function() {
  window.addPortalHighlighter('Below My Level', window.plugin.portalHighlighterPortalsMyLevel.belowLevel);
  window.addPortalHighlighter('Above My Level', window.plugin.portalHighlighterPortalsMyLevel.aboveLevel);
}

// PLUGIN END //////////////////////////////////////////////////////////

@@PLUGINEND@@

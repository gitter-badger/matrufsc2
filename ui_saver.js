/**
 * @constructor
 */
function UI_saver(id)
{
    var self = this;

    var ui_saver = document.getElementById(id).parentNode;
    ui_saver.className = "ui_saver";
    ui_saver.appendChild(document.createTextNode("identificador: "));
    var input = document.createElement("input");
    input.title = "Escolha um identificador qualquer para salvar/abrir seus horários. O identificador pode ser qualquer coisa (por exemplo seu número de matrícula). Cuidado: qualquer um pode usar qualquer identificador.";
    ui_saver.appendChild(input);
    ui_saver.appendChild(document.createTextNode(" "));
    var button = document.createElement("span");
    button.innerHTML = "abrir";
    button.onselectstart = function () { return false; };
    ui_saver.appendChild(button);
    self.button_load = button;
    ui_saver.appendChild(document.createTextNode(" "));
    var button = document.createElement("span");
    button.innerHTML = "salvar";
    button.onselectstart = function () { return false; };
    ui_saver.appendChild(button);
    self.button_save = button;

    self.input = input;

    self.enabled = true;
    self.disable = function() {
        if (!self.enabled) return;
        self.button_save.style.backgroundColor = "lightgrey";
        self.button_load.style.backgroundColor = "lightgrey";
        self.button_save.onclick = function () { return false; };
        self.button_load.onclick = function () { return false; };
        self.button_save.style.opacity = ".6";
        self.button_save.style.filter = "alpha(opacity=60)";
        self.button_load.style.opacity = ".6";
        self.button_load.style.filter = "alpha(opacity=60)";
        self.button_save.title = "escolha um identificador primeiro";
        self.button_load.title = "escolha um identificador primeiro";
        self.enabled = false;
    }
    self.enable = function() {
        if (self.enabled) return;
        self.button_save.style.backgroundColor = "lightblue";
        self.button_load.style.backgroundColor = "lightblue";
        self.button_save.onclick = function () { self.cb_salvar(input.value); return false; };
        self.button_load.onclick = function () { self.cb_carregar(input.value); return false; };
        self.button_save.style.opacity = "";
        self.button_save.style.filter = "";
        self.button_load.style.opacity = "";
        self.button_load.style.filter = "";
        self.button_save.title = "salvar horário";
        self.button_load.title = "abrir horário";
        self.enabled = true;
    }
    self.input.onkeyup = function(e) {
        var c = (e) ? e.keyCode : event.keyCode;
        if (this.value.length == 0) {
            self.disable();
        } else {
            self.enable();
        }
    }

    self.disable();
    /* procedures */
    self.identificar = function(identificador) {
        if (identificador != null && identificador != "") {
            self.input.value = identificador;
            self.enable();
        }
    }
    /* callbacks */
    self.cb_salvar   = null;
    self.cb_carregar = null;
}

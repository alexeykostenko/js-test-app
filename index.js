let params = {
    lines: [
        {
            background: '#00F',
            updateTime: 1000,
            elements: [
                {
                    background: '#CCA',
                    width: 25
                },
                {
                    background: '#A0A',
                    width: 30
                },
                {
                    background: '#20A',
                    width: 25
                },
            ]
        },
        {
            background: '#4CA',
            updateTime: 2000,
            elements: [
                {
                    background: '#B0A',
                    width: 20
                },
                {
                    background: '#F0A',
                    width: 20
                },
                {
                    background: '#50A',
                    width: 40
                },
            ]
        },
        {
            background: '#F0A',
            updateTime: 3000,
            elements: [
                {
                    background: '#00A',
                    width: 15
                },
                {
                    background: '#C0A',
                    width: 30
                },
                {
                    background: '#80A',
                    width: 25
                },
            ]
        },
    ]
};

function Element(params, parentNode) {
    this.background = params.background;
    this.width = params.width;
    this.height = params.height;
    this.parentNode = parentNode;

    this.element = (function (self) {
        let element = document.createElement('div');

        element.style.width = self.width + '%';
        element.style.height = self.height + 'px';
        element.style.background = self.background;
        element.style.display = 'inline-block';

        return element;
    })(this);

    this.show = function () {
        this.parentNode.appendChild(this.element);
    };
}

function Line(params, width, height) {
    this.background = params.background;
    this.updateTime = params.updateTime;
    this.elements = params.elements;
    this.height = height;
    this.width = width;

    this.line = (function (self) {
        let line = document.createElement('div');

        line.style.width = self.width + 'px';
        line.style.height = self.height + 'px';
        line.style.background = self.background;

        return line;
    })(this);
    this.show = function () {
        let line = document.body.appendChild(this.line);

        for (let i = 0, len = this.elements.length; i < len; i++) {
            let params = this.elements[i];
            params['height'] = this.height;

            let element = new Element(params, line);
            element.show();
        }
    };
}

function Screen(lines) {
    this.lines = lines;
    this.lineWidth = screen.width;
    this.lineHeight = screen.height / lines.length;

    this.showLines = function () {
        for (let i = 0, len = this.lines.length; i < len; i++) {
            let line = new Line(this.lines[i], this.lineWidth, this.lineHeight);
            line.show();

            setInterval(function () {
                line.line.style.background = generateRandomColor();
            }, line.updateTime);

        }
    };
}

window.onload = function () {
    let screen = new Screen(params.lines);

    screen.showLines();
};

function generateRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

    const style = document.createElement('style');
    style.innerHTML = `.searchButton {
	box-shadow: 0px 0px 0px 0px #3dc21b;
	background-color:#f78e26;
	border-radius:7px;
	border:2px solid #f78e26;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Trebuchet MS;
	font-size:10px;
	font-weight:bold;
	padding:2px 18px;
	text-decoration:none;
}
.searchButton:hover {
	background-color:#ff962f;
}
.searchButton:active {
	position:relative;
	top:1px;
}
`;
    button.appendChild(style)

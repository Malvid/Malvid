'use strict'

const { BLUE } = require('../constants/colors')

module.exports = `
	.markdown {
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		word-wrap: break-word;
	}

	.markdown a {
		background-color: transparent;
		-webkit-text-decoration-skip: objects;
	}

	.markdown a:active,
	.markdown a:hover {
		outline-width: 0;
	}

	.markdown strong {
		font-weight: inherit;
	}

	.markdown strong {
		font-weight: bolder;
	}

	.markdown h1 {
		font-size: 2em;
		margin: .67em 0;
	}

	.markdown img {
		border-style: none;
	}

	.markdown svg:not(:root) {
		overflow: hidden;
	}

	.markdown code,
	.markdown pre {
		font-family: monospace, monospace;
		font-size: 1em;
	}

	.markdown hr {
		box-sizing: content-box;
		height: 0;
		overflow: visible;
	}

	.markdown input {
		font: inherit;
		margin: 0;
	}

	.markdown input {
		overflow: visible;
	}

	.markdown [type='checkbox'] {
		box-sizing: border-box;
		padding: 0;
	}

	.markdown * {
		box-sizing: border-box;
	}

	.markdown input {
		font-family: inherit;
		font-size: inherit;
		line-height: inherit;
	}

	.markdown a {
		color: ${ BLUE };
		text-decoration: none;
	}

	.markdown a:hover {
		text-decoration: underline;
	}

	.markdown strong {
		font-weight: 600;
	}

	.markdown hr {
		height: 0;
		margin: 15px 0;
		overflow: hidden;
		background: transparent;
		border: 0;
		border-bottom: 1px solid #dfe2e5;
	}

	.markdown hr::before {
		display: table;
		content: '';
	}

	.markdown hr::after {
		display: table;
		clear: both;
		content: '';
	}

	.markdown table {
		border-spacing: 0;
		border-collapse: collapse;
	}

	.markdown td,
	.markdown th {
		padding: 0;
	}

	.markdown h1,
	.markdown h2,
	.markdown h3,
	.markdown h4,
	.markdown h5,
	.markdown h6 {
		margin-top: 0;
		margin-bottom: 0;
		font-weight: 600;
	}

	.markdown h1 {
		font-size: 32px;
	}

	.markdown h2 {
		font-size: 24px;
	}

	.markdown h3 {
		font-size: 20px;
	}

	.markdown h4 {
		font-size: 16px;
	}

	.markdown h5 {
		font-size: 14px;
	}

	.markdown h6 {
		font-size: 12px;
	}

	.markdown p {
		margin-top: 0;
		margin-bottom: 10px;
	}

	.markdown blockquote {
		margin: 0;
	}

	.markdown ul,
	.markdown ol {
		padding-left: 0;
		margin-top: 0;
		margin-bottom: 0;
	}

	.markdown ol ol,
	.markdown ul ol {
		list-style-type: lower-roman;
	}

	.markdown ul ul ol,
	.markdown ul ol ol,
	.markdown ol ul ol,
	.markdown ol ol ol {
		list-style-type: lower-alpha;
	}

	.markdown dd {
		margin-left: 0;
	}

	.markdown code {
		font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
		font-size: 12px;
	}

	.markdown pre {
		margin-top: 0;
		margin-bottom: 0;
		font: 12px 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
	}

	.markdown::before {
		display: table;
		content: '';
	}

	.markdown::after {
		display: table;
		clear: both;
		content: '';
	}

	.markdown>*:first-child {
		margin-top: 0 !important;
	}

	.markdown>*:last-child {
		margin-bottom: 0 !important;
	}

	.markdown a:not([href]) {
		color: inherit;
		text-decoration: none;
	}

	.markdown p,
	.markdown blockquote,
	.markdown ul,
	.markdown ol,
	.markdown dl,
	.markdown table,
	.markdown pre {
		margin-top: 0;
		margin-bottom: 16px;
	}

	.markdown hr {
		height: .25em;
		padding: 0;
		margin: 24px 0;
		background-color: #e1e4e8;
		border: 0;
	}

	.markdown blockquote {
		padding: 0 1em;
		color: #6a737d;
		border-left: .25em solid #dfe2e5;
	}

	.markdown blockquote>:first-child {
		margin-top: 0;
	}

	.markdown blockquote>:last-child {
		margin-bottom: 0;
	}

	.markdown h1,
	.markdown h2,
	.markdown h3,
	.markdown h4,
	.markdown h5,
	.markdown h6 {
		margin-top: 24px;
		margin-bottom: 16px;
		font-weight: 600;
		line-height: 1.25;
	}

	.markdown h1 {
		padding-bottom: .3em;
		font-size: 2em;
		border-bottom: 1px solid #eaecef;
	}

	.markdown h2 {
		padding-bottom: .3em;
		font-size: 1.5em;
		border-bottom: 1px solid #eaecef;
	}

	.markdown h3 {
		font-size: 1.25em;
	}

	.markdown h4 {
		font-size: 1em;
	}

	.markdown h5 {
		font-size: .875em;
	}

	.markdown h6 {
		font-size: .85em;
		color: #6a737d;
	}

	.markdown ul,
	.markdown ol {
		padding-left: 2em;
	}

	.markdown ul ul,
	.markdown ul ol,
	.markdown ol ol,
	.markdown ol ul {
		margin-top: 0;
		margin-bottom: 0;
	}

	.markdown li>p {
		margin-top: 16px;
	}

	.markdown li+li {
		margin-top: .25em;
	}

	.markdown dl {
		padding: 0;
	}

	.markdown dl dt {
		padding: 0;
		margin-top: 16px;
		font-size: 1em;
		font-style: italic;
		font-weight: 600;
	}

	.markdown dl dd {
		padding: 0 16px;
		margin-bottom: 16px;
	}

	.markdown table {
		display: block;
		width: 100%;
		overflow: auto;
	}

	.markdown table th {
		font-weight: 600;
	}

	.markdown table th,
	.markdown table td {
		padding: 6px 13px;
		border: 1px solid #dfe2e5;
	}

	.markdown table tr {
		background-color: #fff;
		border-top: 1px solid #c6cbd1;
	}

	.markdown table tr:nth-child(2n) {
		background-color: #f6f8fa;
	}

	.markdown img {
		max-width: 100%;
		box-sizing: content-box;
		background-color: #fff;
	}

	.markdown code {
		padding: 0;
		padding-top: .2em;
		padding-bottom: .2em;
		margin: 0;
		font-size: 85%;
		background-color: rgba(27, 31, 35, .05);
		border-radius: 3px;
	}

	.markdown pre {
		word-wrap: normal;
	}

	.markdown pre>code {
		padding: 0;
		margin: 0;
		font-size: 100%;
		word-break: normal;
		white-space: pre;
		background: transparent;
		border: 0;
	}

	.markdown .highlight {
		margin-bottom: 16px;
	}

	.markdown .highlight pre {
		margin-bottom: 0;
		word-break: normal;
	}

	.markdown .highlight pre,
	.markdown pre {
		padding: 16px;
		overflow: auto;
		font-size: 85%;
		line-height: 1.45;
		background-color: #f6f8fa;
		border-radius: 3px;
	}

	.markdown pre code {
		display: inline;
		max-width: auto;
		padding: 0;
		margin: 0;
		overflow: visible;
		line-height: inherit;
		word-wrap: normal;
		background-color: transparent;
		border: 0;
	}

	.markdown pre code::before,
	.markdown pre code::after {
		content: normal;
	}

	.markdown hr {
		border-bottom-color: #eee;
	}
`
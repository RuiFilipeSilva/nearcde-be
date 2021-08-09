function emailApplicationSend(candidateName, jobsName) {
    return (`  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
                        <tr>
                            <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                                    alt="">
                            </th>
                        </tr>
                        <tr>
                            <td id="title"
                                style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                                <h1>Obrigado pela tua candidatura!</h1>
                            </td>
                        </tr>
                        <tr>
                            <td id="text" style="text-align: center; padding-left: 20px; padding-right: 20px; color: #000000">
                                <h3>Olá ${candidateName}. Agradecemos o teu interesse na oportunidade ${jobsName} e a confiança na NEARCODE.
                                    <br> Iremos analisar a informação que partilhaste e em breve entraremos em contacto contigo caso
                                    tenhas o perfil que procuramos.
                            </td>
                        </tr>
                        <tr>
                            <th><img id="img"
                                    src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                                    alt=""
                                    style="padding-top: 50px;padding-bottom: 50px;">
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #f7941e;">
                                <a href="https://www.facebook.com/nearcode"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                                <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #888888;">
                                <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                                    style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                                <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                                    4200-024 Porto
                                    <br>
                                    Tlf: +351 22 017 8817
                                    <br>
                                    email: geral@nearcode.com
                                </h5>
                            </th>
                        </tr>
                    </table>`)
}

function emailSpontaneousSend(candidateName) {
    return (`  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
                        <tr>
                            <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                                    alt="">
                            </th>
                        </tr>
                        <tr>
                            <td id="title"
                                style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                                <h1>Obrigado pela tua candidatura!</h1>
                            </td>
                        </tr>
                        <tr>
                            <td id="text" style="text-align: center; padding-left: 20px; padding-right: 20px; color: #000000">
                                <h3>Olá ${candidateName}. Agradecemos o teu interesse na Candidatura Espontanêa e a confiança na NEARCODE.
                                    <br> Iremos analisar a informação que partilhaste e em breve entraremos em contacto contigo caso
                                    tenhas o perfil que procuramos.
                            </td>
                        </tr>
                        <tr>
                            <th><img id="img"
                                    src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                                    alt=""
                                    style="padding-top: 50px;padding-bottom: 50px;">
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #f7941e;">
                                <a href="https://www.facebook.com/nearcode"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                                <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                                        src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                                        style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
                            </th>
                        </tr>
                        <tr>
                            <th style="background-color: #888888;">
                                <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                                    style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                                <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                                    4200-024 Porto
                                    <br>
                                    Tlf: +351 22 017 8817
                                    <br>
                                    email: geral@nearcode.com
                                </h5>
                            </th>
                        </tr>
                    </table>`)
}

function emailDenied(candidateName) {
    return (`  <table style="width: 50%;border: 5px solid #f7941e; margin-left: auto; margin-right: auto;">
                <tr>
                    <th style="background-color: #888888;"><img src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png"
                            alt="" style="height: 130px;">
                    </th>
                </tr>
                <tr>
                    <td id="title"
                        style="padding-top: 50px;font-family: Verdana, Geneva, Tahoma, sans-serif;text-align: center;  color: #000000"">
                        <h1>Obrigado pela tua candidatura!</h1>
                    </td>
                </tr>
                <tr>
                    <th id="text" style="padding-left: 20px; padding-right: 20px; color: #000000">
                        <h3>Olá ${candidateName}. Uma vez mais obrigada pelo teu interesse na NEARCODE. Consideramos o teu perfil particularmente interessante, no entanto decidimos avançar com outras candidaturas.
                            <br> Iremos reter os teus dados para futuros processos de recrutamento, e de acordo com a nossa política de privacidade e de proteção de dados, que poderás consultar no nosso site a qualquer momento.<br>
                            Boa sorte na tua procura de emprego!<br>A EQUIPA NEARCODE
                    </th>
                </tr>
                <tr>
                    <td><img id="img"
                            src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/unnamed.png"
                            alt=""
                            style="height: 300px;padding-top: 50px;padding-bottom: 50px;display: block;margin-left: auto;margin-right: auto;">
                    </td>
                </tr>
                <tr>
                    <th style="background-color: #f7941e;">
                        <a href="https://www.facebook.com/nearcode"><img
                                src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/facebook.png" alt=""
                                style="height: 30px; padding-top: 5px; padding-right: 5px;"></a>
                        <a href="https://www.linkedin.com/company/nearcode-consulting/about/"><img
                                src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/linkedin.png" alt=""
                                style="height: 30px; padding-top: 5px; padding-left: 5px"></a>
                    </th>
                </tr>
                <tr>
                    <th style="background-color: #888888;">
                        <img id="img" src="https://raw.githubusercontent.com/RuiFilipeSilva/table/master/assets/nearcode_3.png" alt=""
                            style="height: 100px;display: block;margin-left: auto;margin-right: auto;"> <br>
                        <h5 style="margin-top: -30px; color: white;">Rua da Alegria, nº 1988, 1º andar,
                            4200-024 Porto
                            <br>
                            Tlf: +351 22 017 8817
                            <br>
                            email: geral@nearcode.com
                        </h5>
                    </th>
                </tr>
            </table>`)
}

module.exports = {
    emailApplicationSend: emailApplicationSend,
    emailSpontaneousSend: emailSpontaneousSend,
    emailDenied: emailDenied
}
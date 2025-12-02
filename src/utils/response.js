class Response {
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }
  success(res) {
    return res.status(this.status || 200).json({
      success: true,
      data: this.data,
      message: this.message ?? "İşlem başarılı",
    });
  }
  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Kayıt işlemi başarılı",
    });
  }
  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Sunucu tarafında bir hata oluştu",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Geçersiz istek",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Lütfen oturum açın",
    });
  }

  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "İstenen kaynak bulunamadı",
    });
  }

  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message:
        this.message ??
        "Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin",
    });
  }
}
exports.Response = Response;

package com.whatsapp.infrastructure

import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

object JsonConfig {
    val json = Json {
        prettyPrint = true
        isLenient = true
        ignoreUnknownKeys = true
        coerceInputValues = true
    }
}
